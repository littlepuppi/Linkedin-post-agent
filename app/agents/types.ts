import type { StreamTextResult } from 'ai';

export interface AgentRequest {
    query: string;
    originalQuery: string;
}

export type AgentResponse = StreamTextResult<Record<string, never>, never>;
