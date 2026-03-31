import type { UIMessage } from 'ai';
import { linkedinPostAgent } from '@/app/agents/linkedinPostAgent';

function textFromUserMessage(message: UIMessage): string {
    return message.parts
        .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
        .map((part) => part.text)
        .join('');
}

function lastUserText(messages: UIMessage[]): string {
    for (let i = messages.length - 1; i >= 0; i--) {
        const m = messages[i];
        if (m.role === 'user') return textFromUserMessage(m);
    }
    return '';
}

function firstUserText(messages: UIMessage[]): string {
    for (const m of messages) {
        if (m.role === 'user') return textFromUserMessage(m);
    }
    return '';
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const messages = body.messages as UIMessage[] | undefined;
        if (!messages?.length) {
            return new Response(JSON.stringify({ error: 'Missing messages' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const query = lastUserText(messages);
        if (!query.trim()) {
            return new Response(JSON.stringify({ error: 'No user message text' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const originalQuery = firstUserText(messages) || query;

        const result = await linkedinPostAgent({
            query,
            originalQuery,
        });

        return result.toUIMessageStreamResponse();
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('POST /api/chat', err);
        return new Response(JSON.stringify({ error: message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
