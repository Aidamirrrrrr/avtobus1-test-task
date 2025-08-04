import type { Children } from './jsx-types';

/**
 * Нормализует дочерние элементы, всегда возвращая массив.
 * Если передан один элемент, оборачивает его в массив.
 * Если undefined — возвращает пустой массив.
 *
 * @param {Children} children — дочерние элементы (массив или одиночный элемент).
 * @returns {Children} — нормализованные дочерние элементы в виде массива или пустого массива.
 */
export function normalizeChildren(children: Children): Children {
    if (Array.isArray(children)) return children;
    return children !== undefined ? [children] : [];
}

/**
 * Проверяет, является ли переданный тег неизвестным HTML-элементом.
 * Возвращает true, если создаётся HTMLUnknownElement и тег не содержит дефиса (не кастомный элемент).
 *
 * @param {string} tag — имя HTML-тега.
 * @returns {boolean} — true, если тег неизвестен браузеру.
 */
export function isUnknownHtmlTag(tag: string): boolean {
    const el = document.createElement(tag);
    return el.constructor === HTMLUnknownElement && !tag.includes('-');
}
