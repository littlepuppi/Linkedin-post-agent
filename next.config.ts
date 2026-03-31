import type { NextConfig } from 'next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
    // Avoid picking a parent folder when multiple lockfiles exist on the machine
    outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
