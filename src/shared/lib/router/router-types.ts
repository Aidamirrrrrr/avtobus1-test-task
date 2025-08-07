import type { Child } from 'jsx';

export interface RouterProviderProps {
    rootElementId?: string;
    routes: Record<string, () => Child>;
    CustomNotFoundPage?: () => void;
}
