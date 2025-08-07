import type { IconProps } from './icon-types';

export const Icon = ({ name, className }: IconProps) => (
    <svg class={className} aria-hidden="true">
        <use href={`#${name}`} />
    </svg>
);
