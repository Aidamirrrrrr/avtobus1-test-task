/**
 * @fileoverview Virtual DOM renderer
 */

import { isEventListener } from '@/shared/utils/dom-utils';

import { _internal } from './hooks';
import { Fragment } from './jsx-runtime';
import type { VNode } from './jsx-types';
import { isUnknownHtmlTag } from './jsx-utils';

let isRenderFunctionSet = false;

/**
 * Рендерит VNode в DOM
 */
export function render(vNode: VNode | string | number | boolean | null | undefined, container: HTMLElement, isRerender = false): void {
    if (!isRenderFunctionSet) {
        _internal.setRenderFunction(render);
        isRenderFunctionSet = true;
    }

    if (vNode == null || typeof vNode === 'boolean') return;

    if (typeof vNode === 'string' || typeof vNode === 'number') {
        container.appendChild(document.createTextNode(String(vNode)));
        return;
    }

    if (vNode.type === Fragment) {
        const children = vNode.props.children;
        if (Array.isArray(children)) {
            for (const child of children) render(child, container, isRerender);
        } else {
            render(children, container, isRerender);
        }
        return;
    }

    if (typeof vNode.type === 'function') {
        if (isRerender) {
            _internal.setCurrentComponent(vNode.type, container, vNode);

            try {
                const result = vNode.type(vNode.props);

                render(result, container, false);
            } finally {
                _internal.clearCurrentComponent();
            }
        } else {
            _internal.setCurrentComponent(vNode.type, container, vNode);

            try {
                const result = vNode.type(vNode.props);

                render(result, container, false);
            } finally {
                _internal.clearCurrentComponent();
            }
        }

        return;
    }

    if (import.meta.env.DEV && isUnknownHtmlTag(vNode.type)) {
        const { __source: source = {} } = vNode.props;
        const { fileName, lineNumber } = source;

        const loc = fileName && lineNumber ? `${fileName}:${lineNumber}` : 'неизвестное местоположение';
        throw new Error(`Неизвестный HTML тег <${vNode.type}> в ${loc}`);
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
        for (const child of children) render(child, el, isRerender);
    } else if (children != null) {
        render(children, el, isRerender);
    }

    container.appendChild(el);
}
