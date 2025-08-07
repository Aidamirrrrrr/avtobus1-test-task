import styles from './button.module.scss';

import { Fragment } from 'jsx';

import { cn } from '@/shared/utils/cn';

import type { ButtonProps } from './button-types';

export const Button = ({
    children,
    className,
    variant = 'primary',
    size = 'lg',
    isIcon,
    startContent,
    endContent,
    onClick,
}: ButtonProps) => {
    return (
        <button
            class={cn(styles.btn, styles[`btn_${variant}`], styles[`btn_${size}`], isIcon && styles.btn_icon, className)}
            onclick={onClick}
        >
            <span class={styles.btn__content}>
                {startContent}
                <Fragment>{children}</Fragment>
                {endContent}
            </span>
        </button>
    );
};
