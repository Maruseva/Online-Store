export function sortASC<T>(field: keyof T) {
    return (a: T, b: T) => (a[field] > b[field] ? 1 : -1);
}

export function sortDESC<T>(field: keyof T) {
    return (a: T, b: T) => (a[field] > b[field] ? -1 : 1);
}
