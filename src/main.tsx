import { render } from '@/shared/lib/jsx';

import { App } from './app';

const root = document.getElementById('root');
if (root) {
    render(<App />, root);
}
