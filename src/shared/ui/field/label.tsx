import styles from './field.module.scss';

import { cn } from '@/shared/utils/cn';

import type { LabelProps } from './field-types';

export const Label = ({ className, htmlFor }: LabelProps) => <label class={cn(styles.label, className)} for={htmlFor}></label>;
