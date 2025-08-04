/**
 * Проверяет, является ли значение валидным обработчиком события (EventListener).
 * EventListener — это либо функция, либо объект с методом handleEvent.
 *
 * @param {unknown} value — проверяемое значение.
 * @returns {value is EventListener} — true, если value — EventListener.
 */
export function isEventListener(value: unknown): value is EventListener {
    return (
        typeof value === 'function' ||
        (typeof value === 'object' &&
            value !== null &&
            'handleEvent' in value &&
            typeof (value as EventListenerObject).handleEvent === 'function')
    );
}
