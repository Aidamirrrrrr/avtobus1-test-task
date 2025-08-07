import styles from './logo.module.scss';

import { Icon } from '@/shared/ui/icon';

export const Logo = () => (
    <div class={styles.logo}>
        <Icon className={styles.logo__icon} name="icon-contact-book" />
        <span class={styles.logo__text}>Книга контактов</span>
    </div>
);
