# Mia Task Board System

## Purpose
This document defines the task board system Mia uses to track work across the full agent team. It provides the operating model for backlog management, sprint execution, ownership, QA progression, release control, and accountability.

## Objectives
- Make all work visible
- Assign a clear owner for every task
- Track stage, status, blockers, QA, and release readiness
- Give Mia a single control surface for active work
- Align Gitea issues and boards with agent workflows
- Prepare the system for future Redis + Qdrant + QMD memory integration

---

# Core Operating Model

## Source of Truth
The task board is the visible source of truth for operational work.

Current system of record:
- Gitea Issues
- Gitea Project / Kanban Board

Future supporting memory layer:
- Redis for active state and coordination
- Qdrant for semantic recall and historical task context
- QMD for structured task, issue, and decision retrieval

## Ownership Model
Every task must have:
- Task ID
- Title
- Description
- Primary owner
- Stage
- Priority
- Due date or target sprint
- Current status
- Linked evidence / outputs
- Next handoff

## Agent Ownership Rules
- Mia owns assignment, prioritization, escalation, and closure
- Yori owns implementation tasks
- Gunther owns QA review and validation status
- Brian owns release readiness and promotion decisions

---

# Board Design

## Recommended Columns
1. Backlog
2. Ready
3. In Progress
4. In Review (Gunther)
5. Ready for Release (Brian)
6. Released
7. Blocked
8. Parked

## Stage Meaning
- Backlog: captured but not yet scheduled
- Ready: refined and ready to start
- In Progress: currently being worked
- In Review (Gunther): awaiting or undergoing QA
- Ready for Release (Brian): QA-passed and awaiting release review
- Released: completed and accepted
- Blocked: cannot move forward due to dependency or issue
- Parked: intentionally deferred

## Recommended Labels
### Stage Labels
- stage/backlog
- stage/ready
- stage/in-progress
- stage/in-review
- stage/release
- stage/released
- stage/blocked
- stage/parked

### Type Labels
- type/feature
- type/bug
- type/task
- type/research
- type/docs
- type/release

### Priority Labels
- priority/critical
- priority/high
- priority/medium
- priority/low

### Agent Labels
- owner/mia
- owner/yori
- owner/gunther
- owner/brian

---

# Task Lifecycle

## Standard Flow
Mia → Yori → Gunther → Brian → Mia

## Step 1: Intake (Mia)
Mia captures the work item and ensures:
- the title is clear
- the goal is clear
- the owner is assigned
- the task is labeled
- the expected output is defined
- the next handoff is identified

Board movement:
- New task starts in Backlog or Ready

## Step 2: Implementation (Yori)
Yori takes the task and delivers:
- implementation summary
- code / config / script / plan
- assumptions
- edge cases
- test steps
- risks or limitations

Board movement:
- Ready → In Progress

## Step 3: QA Review (Gunther)
Gunther validates:
- requirements met
- evidence present
- correctness
- completeness
- quality

Board movement:
- In Progress → In Review (Gunther)
- If failed: return to In Progress
- If passed: move to Ready for Release (Brian)

## Step 4: Release Review (Brian)
Brian validates:
- QA approval exists
- release and deployment readiness exists
- rollback planning exists when needed
- no critical blockers remain

Board movement:
- Ready for Release (Brian) → Released
- If blocked: move to Blocked or return to In Progress

## Step 5: Closure (Mia)
Mia:
- records final outcome
- logs decisions and blockers
- tracks follow-up work
- closes the issue when complete

---

# Required Task Template

Every task should follow this minimum structure.

## Task Header
- Title
- Type
- Priority
- Sprint
- Owner
- Next Handoff

## Description
- Context
- Objective
- Requirements
- Deliverable
- Constraints

## Execution Section
- Current Status
- Notes
- Linked artifacts
- Linked pull requests
- Linked QA evidence

## Completion Section
- Outcome
- Risks accepted
- Decision log reference
- Follow-up items

---

# Mia Control Rules

## Mia must always know:
- what is in progress
- who owns it
- what is blocked
- what is waiting on QA
- what is waiting on release review
- what is overdue
- what is complete but needs follow-up

## Mia must do these actions routinely:
- review the board
- assign owners
- move tasks when status changes
- chase blocked work
- escalate late work
- summarize sprint health

## Mia dashboards should show:
- active tasks by owner
- blocked tasks
- QA queue
- release queue
- overdue tasks
- sprint completion status

---

# Gitea Integration Design

## Board Mapping
Gitea Issues map to individual tasks.
Gitea Project Board columns map to workflow stages.

## Required Automation
Mia’s task board system should eventually automate:
- create issue from task intake
- assign owner labels
- move cards when workflow status changes
- append QA status from Gunther
- append release status from Brian
- store links to evidence and outputs

## Required Skills
- gitea-task-board
- qa-evidence
- gitea-release-flow
- memory-store
- memory-sync

---

# Task Schema (Logical)

```json
{
  "task_id": "TASK-001",
  "title": "Design backup script for OpenClaw host",
  "description": "Create a backup strategy for config and agent workspaces.",
  "type": "task",
  "priority": "high",
  "owner": "yori",
  "reviewer": "gunther",
  "release_owner": "brian",
  "stage": "in-progress",
  "sprint": "Sprint 2",
  "due_date": "2026-04-30",
  "next_handoff": "gunther",
  "status": "active",
  "evidence_links": [],
  "artifact_links": [],
  "decision_refs": [],
  "blocked_by": [],
  "notes": []
}
```

---

# Operating Rhythms

## Daily
Mia reviews:
- new tasks
- blocked tasks
- overdue work
- review queue
- release queue

## Per Sprint
Mia prepares:
- sprint goals
- sprint board
- task assignments
- completion summary
- open risk summary

## On Release
Brian checks readiness.
Gunther confirms QA.
Mia records decision.

---

# Future Enhancements
- Gantt/timeline overlay from issue dates and sprint metadata
- workload view by agent
- auto-generated sprint summaries
- defect trends by severity
- semantic task recall from memory platform
- proactive risk suggestions from Gunther

---

# Principle
No hidden work. No ownerless work. No unverified work. No uncontrolled release.
