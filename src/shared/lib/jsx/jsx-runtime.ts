import type { Children, Props, VNode, VNodeType } from './jsx-types';
import { normalizeChildren } from './jsx-utils';

/**
 * Создает VNode для простых JSX элементов
 */
export function jsx(type: VNodeType, props: Props = {}, key?: string | number | null): VNode {
    return {
        type,
        props: {
            ...props,
            children: props.children,
        },
        key,
    };
}

/**
 * Создает VNode с нормализованными детьми
 */
export function jsxs(type: VNodeType, props: Props = {}, key?: string | number | null): VNode {
    return {
        type,
        props: {
            ...props,
            children: normalizeChildren(props.children),
        },
        key,
    };
}

/**
 * Fragment группирует элементы без создания DOM узла
 */
export function Fragment(props: { children?: Children }): VNode {
    return {
        type: Fragment,
        props: { children: normalizeChildren(props.children) },
        key: null,
    };
}
