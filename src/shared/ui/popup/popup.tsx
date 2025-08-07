import styles from './popup.module.scss';

import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { cn } from '@/shared/utils/cn';

import type { PopupProps } from './popup-types';

export const Popup = ({ title, children, isOpen, footerContent, onClose }: PopupProps) => {
    return (
        <div class={cn(styles.popup__overlay, isOpen && styles.open)} onclick={onClose}>
            <div class={styles.popup}>
                <div class={styles.popup__header}>
                    <div class={styles.popup__title}>{title}</div>
                    <Button onClick={onClose} variant="light-icon" isIcon={true}>
                        <Icon className={styles.popup__closeIcon} name="icon-close" />
                    </Button>
                </div>
                <div class={styles.popup__content}>{children}</div>
                <div class={styles.popup__footer}>{footerContent}</div>
            </div>
        </div>
    );
};
