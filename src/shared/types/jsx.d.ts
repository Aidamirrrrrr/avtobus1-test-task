import type * as HtmlJSX from 'html-jsx';

import type { VNode, WithChildren } from '@/shared/lib/jsx/jsx-types';

declare global {
    namespace JSX {
        /**
         * Тип возвращаемого значения JSX-выражения — виртуальный DOM-узел.
         */
        export type Element = VNode;

        /**
         * Шаблон типа для кастомных HTML-элементов с дефисом в имени, например "my-button".
         */
        type CustomElement = `${string}-${string}`;

        /**
         * Описание встроенных (intrinsic) JSX-элементов.
         *
         * - Для всех стандартных HTML-тегов из `html-jsx` добавляем поддержку children через `WithChildren`.
         * - Для кастомных элементов с дефисом разрешены произвольные пропсы с children.
         */
        export type IntrinsicElements = {
            [K in keyof HtmlJSX.IntrinsicElements]: WithChildren<HtmlJSX.IntrinsicElements[K]>;
        } & {
            [K in CustomElement]?: WithChildren<object>;
        };
    }
}
