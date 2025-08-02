export interface VNode {
    type: string;
    props: Props;
}

export interface HTMLAttributes {
    children?: Children;
    className?: string;
    id?: string;
    style?: Partial<CSSStyleDeclaration>;
    title?: string;
}

export interface DOMAttributes {
    onClick?: (e: MouseEvent) => void;
}

export interface ButtonProps extends Props {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export type Child = VNode | string;
export type Children = Child[];
export type Props = HTMLAttributes & DOMAttributes;
export type FunctionalComponent = (props: Props) => VNode;
export type ElementType = string | FunctionalComponent;
