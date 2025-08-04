/**
 * @fileoverview JSX utilities: normalizeChildren, isFC, isUnknownHtmlTag
 */

import type { Children, FC, VNodeType } from './jsx-types';

/**
 * Нормализует children в массив
 */
export function normalizeChildren(children: Children): Children {
    if (Array.isArray(children)) return children;
    return children !== undefined ? [children] : [];
}

/**
 * Type guard для функциональных компонентов
 */
export function isFC(value: VNodeType): value is FC {
    return typeof value === 'function';
}

/**
 * Проверяет является ли HTML тег неизвестным
 */
export function isUnknownHtmlTag(tag: string): boolean {
    const el = document.createElement(tag);
    return el.constructor === HTMLUnknownElement && !tag.includes('-');
}
