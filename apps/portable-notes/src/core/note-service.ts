import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { ExtractedTask, KnowledgeChunk, NoteRecord } from "./models.js";
import { LlmProvider } from "../providers/llm.js";

export interface NoteInsights {
  summary: string;
  tags: string[];
  entities: string[];
  tasks: ExtractedTask[];
  chunks: KnowledgeChunk[];
}

export class NoteService {
  constructor(private readonly llm: LlmProvider) {}

  async open(path: string): Promise<NoteRecord> {
    const markdown = await readFile(path, "utf8");
    return this.buildRecord(path, markdown);
  }

  async save(path: string, markdown: string): Promise<NoteRecord> {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, markdown, "utf8");
    return this.buildRecord(path, markdown);
  }

  async analyze(note: NoteRecord): Promise<NoteInsights> {
    const summary = await this.generateSummary(note.markdown);
    const entities = this.extractEntities(note.markdown);
    const tags = this.extractTags(note.markdown);
    const tasks = this.extractTasks(note);
    const chunks = await this.chunkAndEmbed(note, tags, entities);

    return { summary, tags, entities, tasks, chunks };
  }

  private buildRecord(path: string, markdown: string): NoteRecord {
    const now = new Date().toISOString();
    return {
      id: this.checksum(path),
      path,
      title: this.deriveTitle(path, markdown),
      markdown,
      lastModifiedIso: now,
      checksum: this.checksum(markdown)
    };
  }

  private deriveTitle(path: string, markdown: string): string {
    const heading = markdown.split("\n").find((line) => line.startsWith("# "));
    return heading?.replace(/^#\s+/, "").trim() || path.split(/[\\/]/).pop() || "Untitled";
  }

  private checksum(value: string): string {
    return createHash("sha256").update(value).digest("hex");
  }

  private async generateSummary(markdown: string): Promise<string> {
    const response = await this.llm.createChatCompletion({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "Summarize the note in 3 bullet points." },
        { role: "user", content: markdown }
      ]
    });
    return response.content;
  }

  private extractTags(markdown: string): string[] {
    const hits = markdown.match(/#[a-zA-Z0-9_-]+/g) ?? [];
    return [...new Set(hits.map((hit) => hit.slice(1).toLowerCase()))];
  }

  private extractEntities(markdown: string): string[] {
    const tokens = markdown.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g) ?? [];
    return [...new Set(tokens)].slice(0, 30);
  }

  private extractTasks(note: NoteRecord): ExtractedTask[] {
    const tasks: ExtractedTask[] = [];
    const lines = note.markdown.split("\n");
    lines.forEach((line, index) => {
      const match = line.match(/^[-*]\s+\[ \]\s+(.+)/);
      if (!match) return;
      tasks.push({
        id: this.checksum(`${note.id}-${index}`),
        noteId: note.id,
        title: match[1],
        status: "todo",
        sourceLineRange: [index + 1, index + 1]
      });
    });
    return tasks;
  }

  private async chunkAndEmbed(note: NoteRecord, tags: string[], entities: string[]): Promise<KnowledgeChunk[]> {
    const chunks = note.markdown.split(/\n{2,}/).map((chunk) => chunk.trim()).filter(Boolean);
    if (chunks.length === 0) return [];

    const embeddings = await this.llm.createEmbedding({ model: "text-embedding-3-small", input: chunks });
    return chunks.map((chunkText, index) => ({
      id: this.checksum(`${note.id}-chunk-${index}`),
      noteId: note.id,
      chunkText,
      tags,
      entities,
      embedding: embeddings.vectors[index] ?? []
    }));
  }
}
