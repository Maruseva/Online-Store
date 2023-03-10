import { CartModel } from '../model/cart.model';
import { Product } from '../model/product.model';

export class CartService {
    private cartModel: CartModel;
    constructor() {
        this.cartModel = new CartModel();
        const storage = localStorage.getItem('products');
        if (storage) {
            this.cartModel.cart = JSON.parse(storage);
        }
    }

    public getProducts(): Product[] {
        return this.cartModel.cart;
    }

    public updateLocalStorage(products: Product[]): void {
        localStorage.setItem('products', JSON.stringify(products));
    }

    public add(product: Product): void {
        this.cartModel.add(product);
        this.updateLocalStorage(this.cartModel.cart);
    }

    public delete(id: number): void {
        this.cartModel.delete(id);
        this.updateLocalStorage(this.cartModel.cart);
    }
}
