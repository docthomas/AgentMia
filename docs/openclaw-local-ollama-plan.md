# OpenClaw Local Ollama Plan for Agent Mia

## Purpose
This document defines the recommended local Ollama model strategy for OpenClaw on a Mac mini with 64 GB of memory, along with prerequisites, fallback rules, and the quality assurance role Mia must enforce across coding and writing work.

## Hardware and Operating Assumptions
- Host: Mac mini
- Memory: 64 GB unified memory
- Primary local agent runtime: OpenClaw through Ollama
- Intensive coding work: GitHub Copilot through proxy
- Secondary fallback for intensive AI work: ChatGPT

## Operating Decision
Agent Mia should prefer a local model for orchestration, planning, follow-up, issue tracking, drafting, summarization, and review work.

Agent Mia should not force the local model to handle every heavy coding task. For large codebase changes, advanced debugging, or long-horizon software engineering tasks, Mia should route the work to GitHub Copilot first and use ChatGPT as fallback.

## Recommended Local Model Stack

### Primary recommendation for OpenClaw
**Model:** `glm-4.7-flash`

Why this is the best first choice for Mia:
- Official Ollama OpenClaw integration documentation specifically recommends `glm-4.7-flash` as a local model for reasoning and code generation.
- It offers a large context window and is positioned by Ollama as a strong local coding and agentic model.
- The Ollama library currently lists the `glm-4.7-flash` quantized model at about 19 GB, which is a practical fit within a 64 GB Mac mini footprint.

Use this as the default model for:
- Chief of Staff orchestration
- planning and delegation
- reviewing outputs
- writing drafts and summaries
- structured follow-up
- moderate technical analysis

### Secondary local option
**Model:** `gpt-oss:20b`

Why keep this available:
- It is a strong agentic and reasoning model.
- The Ollama library lists it at about 14 GB, which is comfortable for local use.
- It is a good alternate if `glm-4.7-flash` is unstable, unavailable, or not aligned with a specific workflow.

Use this for:
- general reasoning
- structured writing
- policy drafting
- operational planning
- quality review

### Optional specialist coding model
**Model:** `qwen3-coder:30b`

Why this is optional rather than primary:
- It is highly code-focused and positioned by Ollama as an agentic coding model.
- The Ollama library lists it at about 19 GB.
- Because intensive coding work will already be handled by GitHub Copilot and ChatGPT fallback, Mia does not need to make this the default local model.

Use this only when:
- a local code-focused model is specifically needed
- Copilot is unavailable
- the task benefits from local agentic code reasoning without sending work to fallback systems

## Models to Avoid on This Mac mini for Primary Use
Avoid using these as the standard local model for Mia:
- `gpt-oss:120b` because the Ollama library lists it at about 65 GB, leaving effectively no safe headroom.
- `qwen3-coder:480b` because Ollama states local use requires roughly 250 GB of memory or unified memory.
- Any model requiring cloud-only execution if the goal is to keep Mia available locally and privately by default.

## Download Plan
Install these local models:

```bash
ollama pull glm-4.7-flash
ollama pull gpt-oss:20b
ollama pull qwen3-coder:30b
```

## OpenClaw Configuration Recommendation
Set OpenClaw to use `glm-4.7-flash` as the primary local model for Mia.

Example:

```bash
ollama launch openclaw --model glm-4.7-flash
```

To reconfigure without starting the full OpenClaw interface:

```bash
ollama launch openclaw --config
```

## Required Prerequisites

### 1. Ollama version
- Use a current Ollama build.
- Note that the Ollama model page for `glm-4.7-flash` states it requires Ollama 0.14.3 and that this version was listed as pre-release at the time of publishing.
- Re-check model compatibility before production rollout.

### 2. Context length
- OpenClaw documentation recommends using at least a 64K token context window for local models.
- Mia should be configured with a large enough context setting to support multi-step agent work.

### 3. Local service health
Before relying on Mia in production, confirm:
- Ollama is installed and running
- OpenClaw launches successfully
- the selected model can complete a multi-step instruction
- follow-up requests remain coherent across a long context session

### 4. Operational fallback rules
Mia must use this routing logic:
- **Local first:** orchestration, planning, summaries, drafting, QA, and moderate technical reasoning
- **GitHub Copilot through proxy:** primary for intensive coding and code generation tasks
- **ChatGPT:** fallback for coding complexity, ambiguous reasoning, or when the local model is insufficient

## Mia Model Selection Policy
Mia should actively choose the best model path instead of treating all requests equally.

### Use `glm-4.7-flash` when:
- coordinating agents
- assigning tasks
- tracking issues, blockers, and decisions
- reviewing deliverables
- drafting communications
- creating structured plans

### Use `gpt-oss:20b` when:
- a second opinion is useful
- a task is more reasoning-heavy than code-heavy
- a writing or policy task benefits from alternate phrasing and logic checks

### Use `qwen3-coder:30b` when:
- a local code specialist is needed
- code review or repair is needed locally
- Copilot is unavailable or unsuitable for the task

### Escalate to Copilot or ChatGPT when:
- the task requires large-scale code generation
- repository-wide refactors are needed
- the task spans long-horizon debugging or architectural redesign
- the local model shows weak confidence, inconsistency, or degraded output quality

## QA Role Definition for Mia
Mia must function as the final quality gate for both coding products and writing products.

### QA mission
Mia is not only a coordinator. Mia is also the acceptance authority for work delivered by the agent squad.

Mia must verify:
- correctness
- completeness
- clarity
- consistency with requirements
- usability of the final deliverable

### QA responsibilities for coding products
For code outputs, Mia must check:
- requirements were actually implemented
- the solution matches the requested scope
- no major assumptions are left undocumented
- edge cases and failure paths are addressed
- testing instructions or validation steps are included
- risks, regressions, and open questions are explicitly documented
- the code or design is maintainable and not needlessly complex

Mia should reject coding work when:
- it is incomplete
- it is untested or unvalidated
- it introduces obvious risk without explanation
- it does not match the requested outcome

### QA responsibilities for writing products
For writing outputs, Mia must check:
- the message fits the audience and purpose
- the tone is appropriate
- the structure is clear
- claims are accurate and supported when needed
- ambiguities are removed
- action items, dates, and owners are explicit when applicable

Mia should reject writing work when:
- it is vague
- it buries the key point
- it lacks an action or decision
- it overstates certainty
- it is not aligned with the intended audience

## Acceptance Standard
No work should be marked complete until Mia confirms:
1. the output matches the request
2. quality is acceptable
3. risks and gaps are logged
4. next actions are clear

## Recommended First Production Setup
Use this order:
1. Install or update Ollama
2. Pull `glm-4.7-flash`
3. Pull `gpt-oss:20b`
4. Pull `qwen3-coder:30b`
5. Launch OpenClaw with `glm-4.7-flash`
6. Test a multi-step orchestration flow with Mia
7. Validate fallback routing to Copilot and ChatGPT
8. Keep QA review mandatory before any deliverable is marked done

## Final Recommendation
For your Mac mini with 64 GB of memory, the best default model for Agent Mia in OpenClaw is **`glm-4.7-flash`**.

Keep **`gpt-oss:20b`** installed as a reliable alternate, and keep **`qwen3-coder:30b`** available as an optional local coding specialist.

This gives Mia a strong local-first operating model while reserving GitHub Copilot and ChatGPT for the heaviest coding and reasoning work.
