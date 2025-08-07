import type { Child, Children } from 'jsx';

export interface PopupProps {
    id?: string;
    title: string;
    isOpen: boolean;
    children?: Children;
    footerContent?: Child;
    onClose: () => void;
}
