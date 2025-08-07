import styles from './container.module.scss';

import { cn } from '@/shared/utils/cn';

import type { ContainerProps } from './container-types';

export const Container = ({ children, className }: ContainerProps) => <div class={cn(styles.container, className)}>{children}</div>;
