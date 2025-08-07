import type { Children, VNode } from 'jsx';

export interface ButtonProps {
    children?: Children;
    className?: string;
    variant?: 'primary' | 'primary-icon' | 'secondary' | 'secondary-icon' | 'ghost' | 'light-icon';
    size?: 'xl' | 'lg';
    isIcon?: boolean;
    startContent?: VNode;
    endContent?: VNode;
    onClick?: () => void;
}
