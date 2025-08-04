import type { Children } from './jsx-types';

/**
 * Нормализует children в массив
 */
export function normalizeChildren(children: Children): Children {
    if (Array.isArray(children)) return children;
    return children !== undefined ? [children] : [];
}

/**
 * Проверяет является ли HTML тег неизвестным
 */
export function isUnknownHtmlTag(tag: string): boolean {
    const el = document.createElement(tag);
    return el.constructor === HTMLUnknownElement && !tag.includes('-');
}
