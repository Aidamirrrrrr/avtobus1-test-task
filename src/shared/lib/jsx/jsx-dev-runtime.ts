import type { Props, VNode, VNodeType } from './jsx-types';

/**
 * Создаёт VNode с дополнительной информацией для разработки (DEV).
 *
 * @param {VNodeType} type — тип узла (строка для HTML-тега или функция-компонент).
 * @param {Props} props — пропсы компонента/тега.
 * @param {string | number | null} key — ключ для идентификации узла в списках.
 * @param {boolean} isStaticChildren — флаг, указывающий, что дочерние элементы статичные (не будут меняться).
 * @param {{ fileName?: string; lineNumber?: number; columnNumber?: number }} source — информация об исходном файле и позиции (для дебага).
 * @param {unknown} self — ссылка на текущий контекст (this), для отслеживания.
 * @returns {VNode} — виртуальный DOM-узел с дополнительными dev-свойствами.
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
