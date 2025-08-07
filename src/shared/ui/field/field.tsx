import styles from './field.module.scss';

import { cn } from '@/shared/utils/cn';

import { ErrorMessage } from './error-message';
import type { FieldProps } from './field-types';
import { Fieldset } from './fieldset';
import { Input } from './input';
import { Label } from './label';

export const Field = ({ fieldset, label, input, error }: FieldProps) => {
    return (
        <Fieldset {...fieldset}>
            {label && (
                <Label className={cn(styles.label, label.className)} htmlFor={label.htmlFor}>
                    {label.children}
                </Label>
            )}
            <Input {...input} />
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Fieldset>
    );
};
