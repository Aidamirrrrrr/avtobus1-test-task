import styles from './add-contact-button.module.scss';

import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { cn } from '@/shared/utils/cn';

import type { AddContactButtonProps } from './add-contact-button-types';

export const AddContactButton = ({ className, size, isFullWidth }: AddContactButtonProps) => {
    return (
        <Button
            className={cn(isFullWidth && styles.btn_fullWidth, className)}
            variant="secondary"
            size={size}
            endContent={<Icon className={styles.btn__icon} name="icon-add" />}
        >
            Добавить контакт
        </Button>
    );
};
