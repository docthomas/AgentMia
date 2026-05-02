export type TaskStatus = "todo" | "in_progress" | "blocked" | "done";

export interface NoteRecord {
  id: string;
  path: string;
  title: string;
  markdown: string;
  lastModifiedIso: string;
  checksum: string;
  summary?: string;
  tags?: string[];
}

export interface ExtractedTask {
  id: string;
  noteId: string;
  title: string;
  description?: string;
  owner?: string;
  dueDateIso?: string;
  priority?: "low" | "medium" | "high";
  status: TaskStatus;
  sourceLineRange?: [number, number];
}

export interface Reminder {
  id: string;
  taskId: string;
  triggerAtIso: string;
  channel: "app" | "outlook" | "planner" | "external";
  state: "pending" | "sent" | "failed";
}

export interface KnowledgeChunk {
  id: string;
  noteId: string;
  chunkText: string;
  tags: string[];
  entities: string[];
  embedding: number[];
}
