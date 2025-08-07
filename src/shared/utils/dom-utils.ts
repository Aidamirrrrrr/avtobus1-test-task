/**
 * Проверяет, является ли значение валидным обработчиком события (EventListener).
 * EventListener — это либо функция, либо объект с методом handleEvent.
 */
export const isEventListener = (value: unknown): value is EventListener => {
    return (
        typeof value === 'function' ||
        (typeof value === 'object' &&
            value !== null &&
            'handleEvent' in value &&
            typeof (value as EventListenerObject).handleEvent === 'function')
    );
};

/**
 * Устанавливает `margin-top` для одного элемента (по ID), равный высоте другого элемента.
 *
 * При изменении размеров элемента-наблюдаемого (`firstElement`) используется `ResizeObserver`
 * для автоматического обновления отступа у целевого элемента (`secondElement`).
 */
export const setElementHeight = (firstElementId: string, secondElementId: string) => {
    const firstElement = document.getElementById(firstElementId);
    const secondElement = document.getElementById(secondElementId);

    if (!firstElement || !secondElement) return;

    const apply = () => {
        const height = firstElement.getBoundingClientRect().height;
        secondElement.style.marginTop = `${height}px`;
    };

    const observer = new ResizeObserver(apply);
    observer.observe(firstElement);
};
