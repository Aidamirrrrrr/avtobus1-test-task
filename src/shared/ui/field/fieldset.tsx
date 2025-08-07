import styles from './field.module.scss';

import { cn } from '@/shared/utils/cn';

import type { FieldsetProps } from './field-types';

export const Fieldset = ({ children, className, id }: FieldsetProps) => (
    <fieldset class={cn(styles.fieldset, className)} id={id}>
        {children}
    </fieldset>
);
