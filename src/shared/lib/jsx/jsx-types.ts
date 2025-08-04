import type * as HtmlJSX from 'html-jsx';

/**
 * Один дочерний элемент виртуального DOM: VNode, текст, число или null/undefined.
 */
export type Child = VNode | string | number | null | undefined;

/**
 * Один или массив дочерних элементов.
 */
export type Children = Child | Child[];

/**
 * Тип функционального компонента (Function Component).
 * Принимает пропсы с опциональным children и возвращает VNode.
 *
 * @template P - Тип пропсов компонента.
 */
export type FC<P = Record<string, unknown>> = (props: P & { children?: Children }) => VNode;

/**
 * Тип узла виртуального DOM:
 * либо строка с именем тега, либо функциональный компонент.
 */
export type VNodeType = string | FC;

/**
 * Виртуальный DOM-узел.
 *
 * @template T - Тип узла (строка-тег или FC).
 */
export interface VNode<T extends string | FC = VNodeType> {
    /** Тип узла: тег или компонент */
    type: T;

    /** Пропсы, включая дочерние элементы и dev-данные */
    props: Props<T>;

    /** Ключ для идентификации узла в списках */
    key?: string | number | null;
}

/**
 * Дополнительные свойства, используемые для разработки и отладки.
 */
type DevProps = {
    /** Информация о файле и позиции для отладки */
    __source?: {
        fileName?: string;
        lineNumber?: number;
        columnNumber?: number;
    };

    /** Ссылка на текущий контекст (this) */
    __self?: unknown;

    /** Отладочная информация */
    __debug?: {
        isStaticChildren?: boolean;
        dev?: boolean;
    };
};

/**
 * Объединяет переданный тип пропсов с поддержкой children.
 *
 * @template T - Тип узла (строка или FC).
 */
type WithChildren<T> = T & { children?: Children };

/**
 * Тип пропсов для узла:
 * объединяет dev-свойства и стандартные пропсы HTML или компонента.
 *
 * Если тип — ключ HTML-тегов (например, 'div'), используется соответствующий интерфейс из html-jsx.
 * Если тип — функциональный компонент, берутся его пропсы.
 * Иначе — просто объект с любыми свойствами.
 */
export type Props<T extends string | FC = string> = WithChildren<
    DevProps &
        (T extends keyof HtmlJSX.IntrinsicElements ? HtmlJSX.IntrinsicElements[T] : T extends FC<infer P> ? P : Record<string, unknown>)
>;
