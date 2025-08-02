import path from 'path';

import { defineConfig } from 'vite';

import { loadValidatedEnv } from './src/shared/config/env/vite';

export default defineConfig(({ mode }) => {
    const env = loadValidatedEnv(mode);

    return {
        resolve: {
            alias: {
                '@': path.resolve(import.meta.dirname, './src'),
            },
        },
        server: {
            port: env.VITE_DEV_PORT,
            open: true,
        },
        preview: {
            port: env.VITE_PREVIEW_PORT,
            open: true,
        },
    };
});
