import { schema } from './schema';

const parsed = schema.safeParse(import.meta.env);
if (!parsed.success) throw new Error('Неверная конфигурация клиента: ' + parsed.error.message);

export const env = parsed.data;
