# Platform Prerequisites and Services (Agent Mia System)

## Purpose
This document extends the local LLM plan and defines all required services, integrations, and skills needed to support Mia, Gunther, and all agents.

---

# Core Services

## 1. Gitea (Primary System of Record)
Gitea provides:
- source control
- issues and task tracking
- pull requests and reviews
- labels and scoped labels
- project boards (Kanban)
- package and container registry

Gitea supports API tokens for automation access and integration. citeturn916763search2

Gitea supports webhooks to trigger external automation on events such as push or PR updates. citeturn916763search1

---

## 2. Gitea Actions + act_runner
Used for CI/CD and deployment automation.

- requires act_runner
- runner can operate in docker or host mode
- docker is recommended for isolation

Gitea delegates jobs to runners rather than executing them directly. citeturn512948search3

---

## 3. Docker Runtime
Required for:
- act_runner execution
- container builds
- local services

---

## 4. OpenClaw
Hosts all agents and skills.

Skills act as modular integrations enabling automation and tool usage. citeturn512948news43

---

## 5. Ollama (Local LLM)
Provides reasoning and orchestration model for agents.

---

# Required Skills (to build or source)

## 1. Gitea Task Board Skill
Status: REQUIRED

Needed to:
- create and update issues
- assign ownership
- move cards across board
- manage lifecycle labels

Implementation: Custom skill using Gitea API

---

## 2. Gitea Release Flow Skill
Status: REQUIRED

Needed to:
- enforce PR workflow
- trigger actions
- validate promotion rules

Implementation: Custom skill + Actions integration

---

## 3. QA Evidence Skill (Gunther)
Status: REQUIRED

Needed to:
- attach test evidence to issues
- validate presence of evidence
- enforce QA templates

Implementation: Custom skill

---

# Supporting Services (Optional but Recommended)

## 1. Log Aggregation (Loki / ELK)
Provides centralized logs for QA validation.

## 2. Monitoring (Prometheus / Grafana)
Provides validation signals for production readiness.

## 3. Artifact Storage (MinIO or registry)
Stores test evidence, builds, and release artifacts.

## 4. Notification System
Slack, email, or webhook-based notifications.

---

# Gaps to Address

The following capabilities must be implemented:

- Skill to manipulate Gitea project boards
- Skill to enforce ALM promotion rules
- Skill to attach and validate QA evidence
- Integration between OpenClaw and Gitea API

---

# Final Recommendation

Use Gitea as the single source of truth for all work tracking, and extend OpenClaw with custom skills to interact with it.

Gunther must rely on evidence stored in Gitea and not accept unverifiable work.
