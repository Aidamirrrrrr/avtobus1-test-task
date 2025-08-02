import { z } from 'zod';

export const schema = z.object({
    VITE_DEV_PORT: z.string().optional().transform(Number),
    VITE_PREVIEW_PORT: z.string().optional().transform(Number),
});
