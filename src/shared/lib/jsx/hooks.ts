/**
 * @fileoverview React-подобные хуки: useState, useEffect
 */

import type { VNode, VNodeType } from './jsx-types';

export type SetStateAction<T> = T | ((prevState: T) => T);

export type Dispatch<T> = (value: SetStateAction<T>) => void;

export type EffectCleanup = () => void;
export type EffectCallback = () => void | EffectCleanup;
export type DependencyList = readonly unknown[];

interface HookState {
    state?: unknown;
    effect?: {
        callback: EffectCallback;
        dependencies?: DependencyList;
        cleanup?: EffectCleanup;
    };
}

interface ComponentState {
    hooks: HookState[];
    hookIndex: number;
    element: HTMLElement;
    vNode: VNode;
    isScheduled: boolean;
}

type RenderFunction = (vNode: VNode | string | number | boolean | null | undefined, container: HTMLElement, isRerender?: boolean) => void;

class HookSystem {
    private components = new Map<VNodeType, ComponentState>();
    private currentComponent: ComponentState | null = null;
    private updateQueue = new Set<ComponentState>();
    private renderFunction: RenderFunction | null = null;
    private mutationObserver: MutationObserver | null = null;
    private componentsByElement = new WeakMap<HTMLElement, ComponentState>();

    public setCurrentComponent(component: VNodeType, element: HTMLElement, vNode: VNode): void {
        if (typeof component !== 'function') {
            throw new Error('Хуки могут использоваться только в функциональных компонентах');
        }

        if (!this.components.has(component)) {
            const componentState = {
                hooks: [],
                hookIndex: 0,
                element,
                vNode,
                isScheduled: false,
            };
            this.components.set(component, componentState);

            this.componentsByElement.set(element, componentState);

            this._initMutationObserver();
        }
        this.currentComponent = this.components.get(component)!;
        this.currentComponent.hookIndex = 0;
    }

    public clearCurrentComponent(): void {
        this.currentComponent = null;
    }

    public setRenderFunction(renderFn: RenderFunction): void {
        this.renderFunction = renderFn;
    }

    public getStats(): {
        /** Количество зарегистрированных компонентов */
        componentCount: number;
        /** Количество компонентов в очереди на обновление */
        pendingUpdates: number;
        /** Активно ли отслеживание изменений DOM */
        isObserving: boolean;
    } {
        return {
            componentCount: this.components.size,
            pendingUpdates: this.updateQueue.size,
            isObserving: !!this.mutationObserver,
        };
    }

    public useState<T>(initialState: T | (() => T)): [T, Dispatch<T>] {
        const hook = this._getNextHook();

        if (hook.state === undefined) {
            hook.state = typeof initialState === 'function' ? (initialState as () => T)() : initialState;
        }

        const currentState = hook.state as T;
        const currentComponent = this.currentComponent!;

        const setState: Dispatch<T> = (value: SetStateAction<T>) => {
            const actualCurrentState = hook.state as T;
            const newState = typeof value === 'function' ? (value as (prevState: T) => T)(actualCurrentState) : value;

            if (Object.is(newState, hook.state)) {
                return;
            }

            hook.state = newState;
            this._scheduleUpdate(currentComponent);
        };

        return [currentState, setState];
    }

    public useEffect(callback: EffectCallback, dependencies?: DependencyList): void {
        const hook = this._getNextHook();

        const hasNoDeps = dependencies === undefined;
        const hasChangedDeps =
            hook.effect?.dependencies === undefined ||
            !dependencies ||
            hook.effect.dependencies.length !== dependencies.length ||
            dependencies.some((dep, i) => !Object.is(dep, hook.effect!.dependencies![i]));

        if (hasNoDeps || hasChangedDeps) {
            if (hook.effect?.cleanup) {
                hook.effect.cleanup();
            }

            const cleanup = callback();

            hook.effect = {
                callback,
                dependencies: dependencies?.slice(),
                cleanup: typeof cleanup === 'function' ? cleanup : undefined,
            };
        }
    }

    /**
     * Очищает компонент и все его эффекты.
     * Вызывается при размонтировании компонента.
     *
     * @param component - Функция компонента для очистки
     *
     * @example
     * ```ts
     * // Принудительная очистка компонента
     * hookSystem.cleanupComponent(MyComponent);
     * ```
     */
    public cleanupComponent(component: VNodeType): void {
        const componentState = this.components.get(component);
        if (!componentState) return;

        for (const hook of componentState.hooks) {
            if (hook.effect?.cleanup) {
                hook.effect.cleanup();
            }
        }

        this.updateQueue.delete(componentState);

        this.components.delete(component);
    }

    /**
     * Инициализирует MutationObserver для автоматического отслеживания удаления компонентов из DOM.
     * Обеспечивает автоматическую очистку компонентов при их удалении из дерева DOM.
     *
     * @private
     */
    private _initMutationObserver(): void {
        if (this.mutationObserver) return;

        this.mutationObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList') {
                    for (const removedNode of mutation.removedNodes) {
                        if (removedNode.nodeType === Node.ELEMENT_NODE) {
                            this._handleElementRemoved(removedNode as HTMLElement);
                        }
                    }
                }
            }
        });

        this.mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    /**
     * Обрабатывает удаление элемента из DOM и очищает связанные компоненты.
     * Рекурсивно проверяет удаленный элемент и все его дочерние элементы.
     *
     * @param element - Удаленный из DOM элемент
     * @private
     */
    private _handleElementRemoved(element: HTMLElement): void {
        const elementsToCheck = [element, ...element.querySelectorAll('*')] as HTMLElement[];

        for (const el of elementsToCheck) {
            const componentState = this.componentsByElement.get(el);
            if (componentState) {
                for (const [component, state] of this.components.entries()) {
                    if (state === componentState) {
                        this.cleanupComponent(component);
                        break;
                    }
                }
            }
        }
    }

    /**
     * Получает следующий хук для текущего компонента.
     * Обеспечивает правильный порядок вызова хуков и создает новые при необходимости.
     *
     * @returns Состояние хука
     * @throws {Error} Если вызывается вне функционального компонента
     * @private
     */
    private _getNextHook(): HookState {
        if (!this.currentComponent) {
            throw new Error('Хуки можно вызывать только внутри функциональных компонентов');
        }

        const { hooks, hookIndex } = this.currentComponent;

        if (hookIndex >= hooks.length) {
            hooks.push({});
        }

        const hook = hooks[hookIndex];
        this.currentComponent.hookIndex++;

        return hook;
    }

    /**
     * Планирует асинхронное обновление компонента.
     * Предотвращает дублирование обновлений и обеспечивает эффективный батчинг.
     *
     * @param componentState - Состояние компонента для обновления
     * @private
     */
    private _scheduleUpdate(componentState: ComponentState): void {
        if (componentState.isScheduled) return;

        componentState.isScheduled = true;
        this.updateQueue.add(componentState);

        void Promise.resolve().then(() => {
            this._flushUpdates();
        });
    }

    /**
     * Выполняет все запланированные обновления компонентов.
     * Сбрасывает флаги планирования и очищает очередь.
     *
     * @private
     */
    private _flushUpdates(): void {
        for (const componentState of this.updateQueue) {
            componentState.isScheduled = false;
            this._rerenderComponent(componentState);
        }
        this.updateQueue.clear();
    }

    /**
     * Перерендерит компонент без мерцания экрана.
     * Использует промежуточный контейнер для синхронного обновления DOM.
     *
     * @param componentState - Состояние компонента для перерендера
     * @private
     */
    private _rerenderComponent(componentState: ComponentState): void {
        const { element, vNode } = componentState;

        if (!this.renderFunction) {
            return;
        }

        const tempContainer = document.createElement('div');
        tempContainer.style.display = 'contents';

        if (typeof vNode.type === 'function') {
            this.setCurrentComponent(vNode.type, element, vNode);

            try {
                const newVNode = vNode.type(vNode.props);

                this.renderFunction(newVNode, tempContainer, true);

                element.replaceChildren(...tempContainer.childNodes);
            } finally {
                this.clearCurrentComponent();
            }
        }
    }
}

const hookSystem = new HookSystem();

/**
 * Hook для управления состоянием компонента
 */
export function useState<T>(initialState: T | (() => T)): [T, Dispatch<T>] {
    return hookSystem.useState(initialState);
}

/**
 * Hook для выполнения побочных эффектов
 */
export function useEffect(callback: EffectCallback, dependencies?: DependencyList): void {
    hookSystem.useEffect(callback, dependencies);
}

/**
 * Размонтирует компонент
 */
export function unmountComponent(component: VNodeType): void {
    hookSystem.cleanupComponent(component);
}

/**
 * Статистика системы хуков
 */
export function getHookSystemStats(): {
    componentCount: number;
    pendingUpdates: number;
    isObserving: boolean;
} {
    return hookSystem.getStats();
}

export const _internal = {
    setCurrentComponent: hookSystem.setCurrentComponent.bind(hookSystem),
    clearCurrentComponent: hookSystem.clearCurrentComponent.bind(hookSystem),
    cleanupComponent: hookSystem.cleanupComponent.bind(hookSystem),
    setRenderFunction: hookSystem.setRenderFunction.bind(hookSystem),
};
