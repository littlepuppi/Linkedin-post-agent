import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'LinkedIn post agent',
    description: 'Fine-tuned model + streaming chat',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
