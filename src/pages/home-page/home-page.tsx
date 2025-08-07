import styles from './home-page.module.scss';

import { Fragment } from 'jsx';

import { AddContactButton } from '@/features/contact';
import { GroupsPopup } from '@/features/group/ui/groups-popup';
import { Container } from '@/shared/ui/container';
import { setElementHeight } from '@/shared/utils/dom-utils';
import { Header } from '@/widgets/header';

export const HomePage = () => {
    requestAnimationFrame(() => setElementHeight('header', 'main'));

    return (
        <Fragment>
            <Header />
            <main class={styles.main} id="main">
                <Container>
                    <AddContactButton className={styles.main__add_contact_button} size="xl" isFullWidth={true} />
                </Container>
                <GroupsPopup />
            </main>
        </Fragment>
    );
};
