import { Product } from './product.model';

export class CartModel {
    static instance: CartModel;
    public cart: Product[] = [];
    constructor() {
        if (!CartModel.instance) {
            CartModel.instance = this;
        }
        return CartModel.instance;
    }

    public add(product: Product): void {
        this.cart.push(product);
    }

    public delete(id: number): void {
        this.cart = this.cart.filter((element) => element.id !== id);
    }
}
