import styles from './group-item.module.scss';

import { Button } from '@/shared/ui/button';
import { Field } from '@/shared/ui/field';
import { Icon } from '@/shared/ui/icon';

import type { GroupItemProps } from './group-item-types';

export const GroupItem = ({ value }: GroupItemProps) => {
    return (
        <div class={styles.groupItem}>
            <Field fieldset={{ className: styles.groupItem__field }} input={{ value: value, name: 'name', autocomplete: 'name' }} />
            <Button variant="secondary-icon" isIcon={true}>
                <Icon className={styles.groupItem__btnIcon} name="icon-delete-forever" />
            </Button>
        </div>
    );
};
