# Portable Notes (Coding Starter)

This folder is a coding starter for the portable markdown-based note system.

## Current capabilities
- Open and save markdown files.
- Analyze notes with an OpenAI-compatible provider.
- Extract markdown checkbox tasks (`- [ ] ...`).
- Build reminder schedules from due dates.
- Publish task/reminder events through an adapter interface.

## Run type-check
```bash
npm install
npm run check
```

## CLI usage
```bash
LLM_BASE_URL=https://api.openai.com \
LLM_API_KEY=... \
node --loader ts-node/esm src/index.ts ./example.md
```

(You can swap to any OpenAI-style endpoint.)
