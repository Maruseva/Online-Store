export function sortASC<T>(field: string) {
    return (a: T, b: T) => (a[field] > b[field] ? 1 : -1);
}

export function sortDESC<T>(field: string) {
    return (a: T, b: T) => (a[field] > b[field] ? -1 : 1);
}
