export type ClassValue = string | number | null | undefined | false | ClassValue[] | { [key: string]: boolean };

export function cn(...args: ClassValue[]): string {
    const classes: string[] = [];

    for (const arg of args) {
        if (!arg) continue;

        if (typeof arg === 'string' || typeof arg === 'number') {
            classes.push(String(arg));
        } else if (Array.isArray(arg)) {
            classes.push(cn(...arg));
        } else if (typeof arg === 'object') {
            for (const key in arg) {
                if (Object.hasOwn(arg, key) && arg[key]) {
                    classes.push(key);
                }
            }
        }
    }

    return classes.join(' ');
}
