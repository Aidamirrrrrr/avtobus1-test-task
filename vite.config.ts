import path from 'path';

import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

import { loadValidatedEnv } from './src/shared/config/env/vite';

export default defineConfig(({ mode }) => {
    const env = loadValidatedEnv(mode);

    return {
        resolve: {
            alias: {
                '@': path.resolve(import.meta.dirname, './src'),
                jsx: path.resolve(import.meta.dirname, './src/shared/lib/jsx'),
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
        plugins: [
            createSvgIconsPlugin({
                iconDirs: [path.resolve(__dirname, 'src/shared/icons')],
                symbolId: 'icon-[name]',
                inject: 'body-last',
            }),
        ],
    };
});
