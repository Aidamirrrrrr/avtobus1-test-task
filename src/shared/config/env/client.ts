import { schema } from './schema';

const parsed = schema.safeParse(import.meta.env);
if (!parsed.success) throw new Error('Invalid client env: ' + parsed.error.message);

export const env = parsed.data;
