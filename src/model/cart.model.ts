import { Product } from './product.model';

export class CartModel {
    public cart: Product[] = [];

    public add(product: Product): void {
        this.cart.push(product);
    }

    public delete(id: number): void {
        this.cart = this.cart.filter((element) => element.id !== id);
    }
}
