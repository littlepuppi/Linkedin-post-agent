# LinkedIn post agent

A Next.js chat app that drafts LinkedIn posts. You type a prompt (for example, a topic or angle), and the app streams a draft from an OpenAI model configured as a LinkedIn post writer.

The agent’s system prompt asks the model to write in the author’s voice and to return ready-to-post copy without extra commentary. It uses the model ID in `OPENAI_FINETUNED_MODEL` (intended for a fine-tuned model) via the Vercel AI SDK.

## Features

- Chat UI for sending a prompt and reading streamed drafts
- API route at `POST /api/chat` that forwards the latest user message to the agent
- Streaming responses through the AI SDK

## Tech stack

- Next.js 15, React 19, TypeScript
- `@ai-sdk/openai`, `@ai-sdk/react`, and `ai`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Production build:

```bash
npm run build
npm start
```

### Environment variables

- `OPENAI_API_KEY`
- `OPENAI_FINETUNED_MODEL` — required; the agent throws if this is not set

## Project structure

```
app/
  page.tsx                 # chat UI
  layout.tsx
  agents/
    linkedinPostAgent.ts   # model call and system prompt
    types.ts
  api/chat/route.ts        # POST handler
```
