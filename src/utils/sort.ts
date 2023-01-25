export function sortASC<T>(field: keyof T) {
    return (a: T, b: T) => (a[field] > b[field] ? 1 : -1);
}

export function sortDESC<T>(field: keyof T) {
    return (a: T, b: T) => (a[field] > b[field] ? -1 : 1);
}

export function getMinMax(array: Set<number>): { min: number; max: number } {
    return { min: Math.min(...array), max: Math.max(...array) };
}
