import type { EventHandler, HTMLAutocomplete } from 'html-jsx';
import type { Children, WithChildren } from 'jsx/jsx-types';

import type { BaseProps } from '@/shared/types/common';

export type InputHandler<T extends Event> = false | EventHandler<HTMLInputElement, T> | null | undefined;

export type InputType =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

export interface InputProps extends BaseProps {
    variant?: 'primary';
    type?: InputType;
    name: string;
    value?: string;
    placeholder?: string;
    autocomplete: HTMLAutocomplete;
    onClick?: InputHandler<MouseEvent>;
    onChange?: InputHandler<Event>;
}

export type FieldsetProps = WithChildren<BaseProps>;

export interface LabelProps extends BaseProps {
    children?: Children;
    htmlFor?: string;
}

export interface ErrorMessageProps {
    children?: Children;
    className?: string;
}

export interface FieldProps {
    input: InputProps;
    fieldset?: Omit<FieldsetProps, 'children'>;
    label?: LabelProps;
    error?: Children;
}
