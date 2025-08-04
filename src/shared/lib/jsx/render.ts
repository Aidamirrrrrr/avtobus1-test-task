import { isEventListener } from '@/shared/utils/dom-utils';

import { Fragment } from './jsx-runtime';
import type { VNode } from './jsx-types';
import { isUnknownHtmlTag } from './jsx-utils';

/**
 * Рекурсивно рендерит виртуальный DOM (VNode) в реальный DOM-контейнер.
 *
 * @param {VNode | string | number | null | undefined} vNode — виртуальный узел или текст/число для рендера.
 * @param {HTMLElement} container — DOM-элемент-контейнер, куда будет добавлен результат.
 *
 * @throws {Error} — если в режиме разработки (DEV) встречается неизвестный HTML-тег.
 */
export function render(vNode: VNode | string | number | null | undefined, container: HTMLElement): void {
    if (vNode == null) return;

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
        render(vNode.type(vNode.props), container);
        return;
    }

    if (import.meta.env.DEV && isUnknownHtmlTag(vNode.type)) {
        const { __source: source = {} } = vNode.props;
        const { fileName, lineNumber } = source;

        const loc = fileName && lineNumber ? `${fileName}:${lineNumber}` : 'unknown location';
        throw new Error(`Unknown HTML tag <${vNode.type}> at ${loc}`);
    }

    const el = document.createElement(vNode.type);

    for (const [key, value] of Object.entries(vNode.props)) {
        if (key === 'children' || key.startsWith('__')) continue;

        if (key.startsWith('on') && isEventListener(value)) {
            const event = key.slice(2);
            el.addEventListener(event, value);
        } else {
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
