/**
 * Навигация по приложению без перезагрузки страницы.
 */
export const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    dispatchEvent(new PopStateEvent('popstate'));
};
