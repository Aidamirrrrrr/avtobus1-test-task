import styles from './header.module.scss';

import { AddContactButton } from '@/features/contact';
import { GroupsButton } from '@/features/group';
import { Container } from '@/shared/ui/container';
import { Logo } from '@/shared/ui/logo';

export const Header = () => (
    <header class={styles.header} id="header">
        <Container className={styles.header__container}>
            <Logo />
            <AddContactButton className={styles.header__add_contact_button} />
            <GroupsButton />
        </Container>
    </header>
);
