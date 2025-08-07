import { Fragment, render } from 'jsx';

import { NotFoundPage } from './not-found-page';
import type { RouterProviderProps } from './router-types';

export const RouterProvider = ({ rootElementId = 'root', routes, CustomNotFoundPage }: RouterProviderProps) => {
    const root = document.getElementById(rootElementId);
    if (!root) throw new Error('Root element not found');

    const renderRoute = () => {
        const path = window.location.pathname;
        const Page = routes[path] ?? CustomNotFoundPage ?? NotFoundPage;
        root.innerHTML = ``;
        render(Page(), root);
    };

    window.addEventListener('popstate', renderRoute);
    renderRoute();

    return <Fragment />;
};
