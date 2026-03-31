import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import type { AgentRequest, AgentResponse } from './types';

const SYSTEM_PROMPT = `You are a LinkedIn post writer. You write in the author's authentic voice—the model was fine-tuned on their real posts, so lean into that style (tone, rhythm, how they open and close ideas).

Produce ready-to-post LinkedIn copy. Keep it human and specific. Do not prepend meta-commentary like "Here's a post" unless the user asked for that.`;

export async function linkedinPostAgent(request: AgentRequest): Promise<AgentResponse> {
    const modelId = process.env.OPENAI_FINETUNED_MODEL;
    if (!modelId) {
        throw new Error('OPENAI_FINETUNED_MODEL is not set');
    }
    console.log('API KEY loaded:', !!process.env.OPENAI_API_KEY);
    console.log('request.query', request.query);

    return streamText({
        model: openai(modelId),
        system: `${SYSTEM_PROMPT}

Original user message (full context): "${request.originalQuery}"`,
        prompt: request.query,
    });
}
