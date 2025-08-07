import { Fragment } from 'jsx';

import { HomePage } from '@/pages/home-page';
import { RouterProvider } from '@/shared/lib/router/router-provider';

export const routes = {
    '/': HomePage,
};

export const App = () => {
    return (
        <Fragment>
            <RouterProvider routes={routes} />
        </Fragment>
    );
};
