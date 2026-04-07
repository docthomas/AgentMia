# Agent Workflow (Mia → Yori → Gunther → Brian)

## Overview
This document defines the standard workflow between all agents in the system.

---

## Flow

1. Mia assigns task
2. Yori implements solution
3. Gunther validates quality
4. Brian evaluates release readiness
5. Mia confirms completion

---

## Step 1: Mia (Task Assignment)
Mia must provide:
- Context
- Objective
- Requirements
- Deadline
- Expected output format

---

## Step 2: Yori (Development)
Yori must deliver:
1. Implementation Summary
2. Solution / Code
3. Assumptions
4. Edge Cases
5. Test Plan
6. Risks / Limitations

Yori submits work to Gunther.

---

## Step 3: Gunther (QA Validation)
Gunther must:
- Apply QA checklists
- Require test evidence
- Classify severity
- Approve or reject work

If rejected:
- Return to Yori

If approved:
- Pass to Brian

---

## Step 4: Brian (Release Control)
Brian must verify:
- QA approval exists
- No critical defects
- Deployment plan exists
- Rollback plan exists
- Monitoring plan exists

Brian decision:
- APPROVED → proceed to release
- BLOCKED → return to Yori/Gunther

---

## Step 5: Mia (Final Authority)
Mia:
- Confirms completion
- Logs decision
- Tracks follow-ups

---

## Principle
No work is complete until it passes through all stages.

---

## Future Integration
- Gitea issues represent tasks
- Board columns represent stage
- Memory platform tracks decisions and evidence
