import type { Child, Children } from './jsx-types';
import { render } from './render';

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
    if (isSvgTag(tag)) return false;

    const el = document.createElement(tag);
    return el.constructor === HTMLUnknownElement && !tag.includes('-');
}

/**
 * Используется для определения, нужно ли использовать пространство имён SVG
 * при создании DOM-элементов.
 */
const svgTags = new Set(['svg', 'path', 'g', 'defs', 'clipPath', 'rect', 'circle', 'use']);

/**
 * Проверяет, является ли тег SVG-элементом.
 */
export function isSvgTag(tag: string): boolean {
    return svgTags.has(tag);
}

/**
 * Создаёт DOM-элемент с учётом SVG namespace для SVG-тегов.
 */
export function createElement(tag: string): Element {
    if (isSvgTag(tag)) {
        return document.createElementNS('http://www.w3.org/2000/svg', tag);
    }
    return document.createElement(tag);
}

/**
 * Проверяет, является ли значение допустимым типом для HTML-атрибута.
 */
export function isValidAttributeValue(value: unknown): value is string | number | boolean {
    return ['string', 'number', 'boolean'].includes(typeof value);
}

/**
 * Отрисовывает VNode в указанный DOM-элемент (портал).
 */
export function createPortal(child: Child, container: Element) {
    container.innerHTML = '';
    render(child, container);
}
