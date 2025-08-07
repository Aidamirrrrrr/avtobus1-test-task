import { isEventListener } from '@/shared/utils/dom-utils';

import { Fragment } from './jsx-runtime';
import type { VNode } from './jsx-types';
import { createElement, isUnknownHtmlTag, isValidAttributeValue } from './jsx-utils';

/**
 * Рендерит VNode в DOM
 */
export function render(vNode: VNode | string | number | boolean | null | undefined, container: Element): void {
    if (vNode == null || typeof vNode === 'boolean') return;

    if (typeof vNode === 'string' || typeof vNode === 'number') {
        container.appendChild(document.createTextNode(String(vNode)));
        return;
    }

    if (vNode.type === Fragment) {
        const children = vNode.props.children;
        if (Array.isArray(children)) {
            for (const child of children) render(child, container);
        } else {
            render(children, container);
        }
        return;
    }

    if (typeof vNode.type === 'function') {
        const result = vNode.type(vNode.props);

        if (Array.isArray(result)) {
            for (const child of result) render(child, container);
        } else {
            render(result, container);
        }

        return;
    }

    if (import.meta.env.DEV && isUnknownHtmlTag(vNode.type)) {
        const { __source: source = {} } = vNode.props;
        const { fileName, lineNumber } = source;
        const loc = fileName && lineNumber ? `${fileName}:${lineNumber}` : 'неизвестное местоположение';
        throw new Error(`Неизвестный HTML тег <${vNode.type}> в ${loc}`);
    }

    const el = createElement(vNode.type);

    for (const [key, value] of Object.entries(vNode.props)) {
        if (key === 'children' || key.startsWith('__') || value === undefined || value === null) {
            continue;
        }

        if (key.startsWith('on') && isEventListener(value)) {
            const event = key.slice(2);
            el.addEventListener(event, value);
        } else if (isValidAttributeValue(value)) {
            el.setAttribute(key, String(value));
        }
    }

    const { children } = vNode.props;
    if (Array.isArray(children)) {
        for (const child of children) render(child, el);
    } else if (children != null) {
        render(children, el);
    }

    container.appendChild(el);
}
