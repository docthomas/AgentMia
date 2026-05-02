# Portable AI Note App Specification (Windows 11 + macOS)

## 1) Product vision
Build a portable, cross-platform note-taking application that:
- stores notes as local **Markdown (`.md`) files**,
- syncs to **OneDrive, Dropbox, or Google Drive**,
- sends note content to an AI pipeline that **organizes and indexes knowledge** for humans and agents,
- extracts and tracks tasks (owner, due date, status),
- creates reminders in-app and syncs them to **Outlook, Microsoft Planner, or other todo systems**,
- supports **provider-agnostic LLM integrations** including OpenAI-style APIs,
- autosaves in real time and reopens individual note files.

## 2) Recommended technical stack

### Desktop runtime
- **Tauri + React + TypeScript**
  - Native installers for Windows 11 and macOS.
  - Small footprint compared with Electron.

### Editor
- **CodeMirror** or **Monaco** for markdown editing with autosave.

### Local storage
- Notes are plain `.md` files in a user-selected workspace directory.
- App metadata in local SQLite (`app.db`) via Tauri plugin:
  - task index
  - reminder queue
  - AI embeddings index metadata
  - sync state/versioning pointers

### Cloud sync strategy
- Use user cloud client folders first (simplest + most portable):
  - OneDrive folder, Dropbox folder, Google Drive folder
- Optional direct API mode for enterprise environments.

### AI + indexing
- Provider abstraction with OpenAI-compatible schema:
  - `POST /v1/chat/completions`
  - `POST /v1/embeddings`
- Pluggable providers:
  - OpenAI
  - Azure OpenAI
  - Local OpenAI-compatible gateways (e.g., Ollama proxy)
- Local vector index options:
  - SQLite + `sqlite-vec` OR
  - embedded Qdrant/LanceDB depending on packaging preference

## 3) Core functional requirements

### 3.1 Markdown notes
- Create/open/edit `.md` files.
- Real-time autosave (e.g., debounce 300–600ms).
- Recover unsaved buffer after crash.
- Reopen recent files on startup.

### 3.2 Knowledge organization
When note changes are saved:
1. Parse markdown sections, headings, links, tags.
2. AI generates:
   - concise summary
   - canonical tags/topics
   - entities (people, projects, systems)
3. Store chunked embeddings + metadata for semantic retrieval.

### 3.3 Task extraction and tracking
From freeform notes, AI identifies tasks with fields:
- `task_id`
- `title`
- `description`
- `owner`
- `due_date`
- `priority`
- `status` (`todo`, `in_progress`, `blocked`, `done`)
- `source_note_path`
- `source_line_range`

Task records should be editable by users (AI suggestions are not authoritative).

### 3.4 Reminder automation
- Scheduler checks due dates and reminder rules.
- Default reminders: T-1 day, T-2 hours, at due time.
- Notification channels:
  - in-app toast
  - local OS notification
  - optional external integration (Outlook/Planner/Todoist/etc.)

### 3.5 Integrations

#### Microsoft Outlook Calendar / Tasks
- Microsoft Graph OAuth2 integration.
- Create/update reminder events or tasks.

#### Microsoft Planner
- Graph API support for creating Planner tasks in configured plan/bucket.

#### Other task systems
- Plugin adapter model:
  - Todoist
  - Asana
  - Jira
  - ClickUp

## 4) High-level architecture

```text
UI (React)
  ├─ Markdown Editor
  ├─ Task Board
  ├─ Knowledge Search
  └─ Integrations Settings

Desktop Core (Tauri)
  ├─ File Service (.md read/write/watch)
  ├─ AI Pipeline Service
  │    ├─ Summarizer
  │    ├─ Task Extractor
  │    └─ Embeddings Indexer
  ├─ Reminder Scheduler
  ├─ Sync Service (folder/API modes)
  └─ Integration Connectors (Graph, etc.)

Data Layer
  ├─ Local Markdown files
  ├─ SQLite metadata DB
  └─ Vector index
```

## 5) Data model (minimum)

### `notes`
- `id`
- `path` (unique)
- `title`
- `last_modified`
- `checksum`
- `summary`

### `tasks`
- `id`
- `note_id`
- `title`
- `owner`
- `due_date`
- `status`
- `priority`
- `external_system`
- `external_id`

### `reminders`
- `id`
- `task_id`
- `trigger_at`
- `channel` (app, outlook, planner, etc.)
- `state` (pending, sent, failed)

### `knowledge_chunks`
- `id`
- `note_id`
- `chunk_text`
- `embedding_vector`
- `topic_tags`
- `entity_json`

## 6) OpenAI-style provider interface

```ts
interface LlmProvider {
  name: string;
  createChatCompletion(input: ChatCompletionRequest): Promise<ChatCompletionResponse>;
  createEmbedding(input: EmbeddingRequest): Promise<EmbeddingResponse>;
}
```

Provider configuration:
- `baseUrl`
- `apiKey`
- `modelChat`
- `modelEmbedding`
- `organization?`
- `apiVersion?` (for Azure style)

## 7) Sync and conflict handling
- Detect file changes from both local editor and cloud folder sync.
- If conflict:
  - preserve both versions (`file (conflict timestamp).md`)
  - create merge suggestion view.
- Keep append-only revision log for recovery/audit.

## 8) Security and privacy
- API keys encrypted at rest using OS keychain.
- Configurable AI processing mode:
  - cloud model mode
  - local model mode
- PII redaction option before external API calls.
- Workspace allowlist for indexed paths.

## 9) MVP milestone plan

### Milestone 1 (Core Editor + Local Index)
- Markdown editor, autosave, reopen files.
- Local task extraction with one provider.
- Basic semantic search.

### Milestone 2 (Cloud Folder + Reminders)
- OneDrive/Dropbox/Google folder workflows.
- In-app reminders + OS notifications.

### Milestone 3 (Enterprise Integrations)
- Outlook + Planner connectors.
- Plugin SDK for additional task systems.

## 10) Acceptance criteria
- Runs on Windows 11 and macOS installers.
- Notes are plain `.md` files and readable outside app.
- Editing autosaves within <1 second of pause.
- Reopen recent files reliably after restart.
- Tasks extracted with owner + due date editability.
- Reminder appears in app and at least one external integration.
- Provider can be switched between OpenAI-style backends without code changes in UI flows.
