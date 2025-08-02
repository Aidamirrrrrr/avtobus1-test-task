import type { Children, ElementType, Props, VNode } from './types';

/**
 * Создаёт виртуальный DOM-узел.
 *
 * @param type - Строка с названием HTML-тега или функциональный компонент.
 * @param props - Объект с пропсами (атрибуты, обработчики, `children` и т.д.).
 * @param children - Дочерние элементы (строки или другие VNode).
 * @returns Виртуальный DOM-элемент.
 */
export function createElement(type: ElementType, props?: Props, ...children: Children): VNode {
    props = props || {};
    props.children = children.flat();

    if (typeof type === 'function') {
        return type(props);
    }

    return {
        type,
        props,
    };
}

/**
 * JSX Fragment — объединяет несколько детей без дополнительного DOM-обёртки.
 *
 * @param props - Объект с `children`
 * @returns Виртуальный DOM-элемент.
 */
export function Fragment({ children = [] }: Props): VNode {
    return createElement('fragment', {}, ...children);
}

/**
 * Проверяет, является ли значение допустимым слушателем события (EventListener).
 *
 * Используется для безопасного подключения обработчиков событий
 * через `addEventListener` без нарушения типовой системы TypeScript.
 *
 * @param value - Произвольное значение, которое нужно проверить.
 * @returns `true`, если значение — функция и может быть использовано как `EventListener`.
 */
function isEventListener(value: unknown): value is EventListener {
    return typeof value === 'function';
}

/**
 * Рекурсивно рендерит виртуальный DOM в реальный DOM.
 *
 * @param vNode - DOM-элемент или строка.
 * @param container - HTML-элемент-контейнер, в который будет вставлен результат.
 */
export function render(vNode: VNode | string, container: HTMLElement): void {
    if (typeof vNode === 'string') {
        container.appendChild(document.createTextNode(vNode));
        return;
    }

    if (vNode.type === 'fragment') {
        for (const child of vNode.props.children || []) {
            render(child, container);
        }
        return;
    }

    const el = document.createElement(vNode.type);

    for (const [key, value] of Object.entries(vNode.props)) {
        if (key === 'children') continue;

        if (key.startsWith('on')) {
            const eventName = key.slice(2).toLowerCase();

            if (isEventListener(value)) {
                el.addEventListener(eventName, value);
            } else {
                throw new TypeError(`Property "${key}" must be a function to be used as an event listener. Got: ${typeof value}`);
            }
        } else {
            el.setAttribute(key, String(value));
        }
    }

    for (const child of vNode.props.children || []) {
        render(child, el);
    }

    container.appendChild(el);
}
