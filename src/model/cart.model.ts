import { Product } from './product.model';

export class CartModel {
    public cart: Product[] = [];

    public add(product: Product): void {
        this.cart.push(product);
    }

    public delete(id: number): void {
        this.cart.forEach((element, index) => {
            if (element.id === id) {
                this.cart.splice(index, 1);
            }
        });
    }
}
