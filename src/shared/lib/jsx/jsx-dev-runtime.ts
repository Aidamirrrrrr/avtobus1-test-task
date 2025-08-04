/**
 * @fileoverview JSX Dev Runtime with debug info
 */

import type { Props, VNode, VNodeType } from './jsx-types';

/**
 * Создает VNode с debug информацией
 */
export function jsxDEV(
    type: VNodeType,
    props: Props,
    key: string | number | null,
    isStaticChildren: boolean,
    source: { fileName?: string; lineNumber?: number; columnNumber?: number },
    self: unknown,
): VNode {
    return {
        type,
        props: {
            ...props,
            __source: source,
            __self: self,
            __debug: { isStaticChildren, dev: true },
        },
        key,
    };
}
