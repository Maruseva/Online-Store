import { CartModel } from '../model/cart.model';
import { Product } from '../model/product.model';

export class CartService {
    private cartModel: CartModel;
    constructor() {
        this.cartModel = new CartModel();
    }

    public getProducts(): Product[] {
        const storage = localStorage.getItem('products');
        if (storage) {
            this.cartModel.cart = JSON.parse(storage);
        }
        return this.cartModel.cart;
    }

    public updateLocalStorage(products: Product[]): void {
        localStorage.setItem('products', JSON.stringify(products));
    }

    public add(product: Product): void {
        const products = this.getProducts();
        this.cartModel.add(product);
        this.updateLocalStorage(products);
    }

    public delete(id: number): void {
        const products = this.getProducts();
        this.cartModel.delete(id);
        this.updateLocalStorage(products);
    }
}
