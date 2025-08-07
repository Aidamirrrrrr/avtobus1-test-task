import styles from './field.module.scss';

import { cn } from '@/shared/utils/cn';

import type { InputProps } from './field-types';

export const Input = ({ className, variant = 'primary', onClick, onChange, ...rest }: InputProps) => (
    <input class={cn(styles.input, styles[`input_${variant}`], className)} onclick={onClick} onchange={onChange} {...rest} />
);
