import { loadEnv } from 'vite';

import { schema } from './schema';

export function loadValidatedEnv(mode: string): ReturnType<typeof schema.parse> {
    const raw = loadEnv(mode, process.cwd(), '');
    return schema.parse(raw);
}
