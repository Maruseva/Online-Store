import { Product } from '../model/product.model';

export function sortASC<T>(field: keyof T) {
    return (a: T, b: T) => (a[field] > b[field] ? 1 : -1);
}

export function sortDESC<T>(field: keyof T) {
    return (a: T, b: T) => (a[field] > b[field] ? -1 : 1);
}

export function getMin(products: Product[], name: 'price' | 'stock'): number {
    const arr = products.map((el) => el[name]);
    return Math.min(...arr);
}

export function getMax(products: Product[], name: 'price' | 'stock'): number {
    const arr = products.map((el) => el[name]);
    return Math.max(...arr);
}
