# Sprint 2: Memory Platform (Redis + Qdrant + QMD) + Gitea Integration

## Goal
Deploy a local memory platform (Redis, Qdrant, QMD) and integrate it with Gitea Issues/Boards via OpenClaw skills so agents can persist, retrieve, and act on memory tied to tasks.

## References
- docs/suggestions-register.md
- docs/platform-prerequisites-and-services.md
- docs/sprint-1-lume-deployment.md

---

## Scope
- Redis for fast ephemeral/state cache
- Qdrant for vector memory (embeddings, semantic recall)
- QMD (Query/Memory/Docs layer) for structured memory access patterns
- Gitea linkage: issues, labels, board columns, PRs
- OpenClaw skills for CRUD + retrieval + task sync

---

## Tasks

### 1. Provision Services (host or VM sidecar)
- Install Redis (native or container)
- Install Qdrant (native or container)
- Define storage paths and backups
- Validate connectivity from OpenClaw host/VM

### 2. Schema & Namespaces
- Define collections in Qdrant (tasks, decisions, issues, artifacts)
- Define Redis keys (sessions, task states, locks)
- Define QMD schemas (documents, embeddings, metadata)

### 3. Gitea Linkage Model
- Map Gitea Issue → Memory record (id, title, labels, owner, stage)
- Map PR → Memory record (links to issues, commits, status)
- Map Board Column → stage label (stage/dev, stage/test, stage/prod)

### 4. Skills (build or reuse)
- gitea-task-board (create/update/move issues)
- gitea-release-flow (PR validation, stage promotion)
- qa-evidence (attach/validate evidence)
- memory-store (write to Qdrant/Redis)
- memory-retrieve (semantic search + filters)
- memory-sync (bi-directional sync with Gitea)

### 5. Agent Wiring
- Mia: create/assign tasks → write memory + create Gitea issue
- Gunther: validate → attach evidence → update issue + memory
- Release Manager: gate promotions → update stage labels + memory

### 6. Observability
- Add minimal logs for skill calls
- Validate traceability: Issue ↔ Memory ↔ Decisions

### 7. Validation
- Create sample feature end-to-end
- Ensure memory entries exist for tasks/decisions/issues
- Ensure board reflects stage transitions

---

## Deliverables
- Redis + Qdrant operational
- QMD schema defined
- Skills implemented (or integrated)
- Gitea issues/boards synced with memory
- End-to-end demo passing

---

## Risks
- Inconsistent IDs between systems
- Missing auth/permissions for Gitea API
- Embedding quality/latency for Qdrant

---

## Acceptance Criteria
- Every task has a Gitea issue and memory record
- Gunther cannot approve without evidence linked in both systems
- Stage changes update both Gitea and memory

---

## Issue Seed (create in GitHub)
- Setup Redis service
- Setup Qdrant service
- Define QMD schemas
- Implement gitea-task-board skill
- Implement gitea-release-flow skill
- Implement qa-evidence skill
- Implement memory-store skill
- Implement memory-retrieve skill
- Implement memory-sync skill
- Wire Mia/Gunther/Release Manager to skills
- End-to-end validation scenario
