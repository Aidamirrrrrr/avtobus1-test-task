import type { createElement as _createElement } from '@/shared/lib/jsx/runtime';
import type { ButtonProps, Props, VNode } from '@/shared/lib/jsx/types';

declare global {
    const createElement: typeof _createElement;

    interface Window {
        createElement: typeof _createElement;
    }

    namespace JSX {
        type Element = VNode;

        interface IntrinsicElements {
            div: Props;
            h1: Props;
            p: Props;
            span: Props;
            button: ButtonProps;
        }
    }
}
