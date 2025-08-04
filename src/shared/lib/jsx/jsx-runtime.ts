import type { Children, Props, VNode, VNodeType } from './jsx-types';
import { normalizeChildren } from './jsx-utils';

/**
 * Создаёт виртуальный узел (VNode) с необработанными детьми.
 * Используется для одиночных или простых элементов.
 *
 * @param {VNodeType} type - Тип узла (строка для HTML-тега или функция-компонент).
 * @param {Props} [props={}] - Свойства компонента или тега.
 * @param {string | number | null} [key] - Ключ для идентификации в списках.
 * @returns {VNode} - Виртуальный DOM-узел.
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
 * Создаёт виртуальный узел (VNode) с нормализованными детьми.
 * Используется для элементов с несколькими детьми (например, массивы).
 *
 * @param {VNodeType} type - Тип узла.
 * @param {Props} [props={}] - Свойства компонента или тега.
 * @param {string | number | null} [key] - Ключ для идентификации.
 * @returns {VNode} - Виртуальный DOM-узел с нормализованными детьми.
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
 * Фрагмент — специальный компонент, который просто возвращает нормализованные дочерние элементы.
 * Не создаёт дополнительного DOM-узла.
 *
 * @param {{ children?: Children }} props - Свойство children.
 * @returns {Children} - Нормализованные дочерние элементы.
 */
export function Fragment(props: { children?: Children }): Children {
    return normalizeChildren(props.children);
}
