export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
}

export interface ChatCompletionResponse {
  content: string;
  raw: unknown;
}

export interface EmbeddingRequest {
  model: string;
  input: string | string[];
}

export interface EmbeddingResponse {
  vectors: number[][];
  raw: unknown;
}

export interface LlmProvider {
  name: string;
  createChatCompletion(input: ChatCompletionRequest): Promise<ChatCompletionResponse>;
  createEmbedding(input: EmbeddingRequest): Promise<EmbeddingResponse>;
}

export interface OpenAICompatibleConfig {
  name: string;
  baseUrl: string;
  apiKey: string;
  organization?: string;
}

export class OpenAICompatibleProvider implements LlmProvider {
  constructor(private readonly config: OpenAICompatibleConfig) {}

  get name(): string {
    return this.config.name;
  }

  async createChatCompletion(input: ChatCompletionRequest): Promise<ChatCompletionResponse> {
    const res = await fetch(`${this.config.baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(input)
    });

    if (!res.ok) {
      throw new Error(`Chat completion failed: ${res.status}`);
    }

    const raw = await res.json();
    const content = raw?.choices?.[0]?.message?.content ?? "";
    return { content, raw };
  }

  async createEmbedding(input: EmbeddingRequest): Promise<EmbeddingResponse> {
    const res = await fetch(`${this.config.baseUrl}/v1/embeddings`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(input)
    });

    if (!res.ok) {
      throw new Error(`Embedding request failed: ${res.status}`);
    }

    const raw = await res.json();
    const vectors = (raw?.data ?? []).map((entry: { embedding: number[] }) => entry.embedding);
    return { vectors, raw };
  }

  private headers(): HeadersInit {
    return {
      "content-type": "application/json",
      authorization: `Bearer ${this.config.apiKey}`,
      ...(this.config.organization ? { "OpenAI-Organization": this.config.organization } : {})
    };
  }
}
