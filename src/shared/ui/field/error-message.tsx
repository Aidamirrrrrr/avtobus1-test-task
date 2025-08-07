import styles from './field.module.scss';

import { cn } from '@/shared/utils/cn';

import type { ErrorMessageProps } from './field-types';

export const ErrorMessage = ({ children, className }: ErrorMessageProps) => <span class={cn(styles.error, className)}>{children}</span>;
