'use client';

import { useChat } from '@ai-sdk/react';

export default function Page() {
    const { messages, sendMessage, status, error } = useChat();

    const busy = status === 'submitted' || status === 'streaming';

    return (
        <main>
            <h1>LinkedIn post agent</h1>
            {messages.map((message) => (
                <div key={message.id} className={message.role === 'user' ? 'msg msg-user' : 'msg msg-assistant'}>
                    <strong>{message.role === 'user' ? 'You' : 'Draft'}</strong>
                    {message.parts.map((part, i) =>
                        part.type === 'text' ? <div key={`${message.id}-${i}`}>{part.text}</div> : null,
                    )}
                </div>
            ))}

            {error ? <div className="error">{error.message}</div> : null}

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const input = form.elements.namedItem('message') as HTMLInputElement;
                    const text = input.value.trim();
                    if (!text || busy) return;
                    sendMessage({ text });
                    input.value = '';
                }}
            >
                <div>
                    <input type="text" name="message" placeholder="e.g. Write a post about job searching in 2026" autoComplete="off" disabled={busy} />
                    <button type="submit" disabled={busy}>
                        {busy ? '…' : 'Send'}
                    </button>
                </div>
            </form>
        </main>
    );
}
