import { Fragment } from 'jsx';

import { Counter } from '@/shared/components/counter';

export const App = () => {
    return (
        <Fragment>
            <Counter initialValue={5} step={2} />
        </Fragment>
    );
};
