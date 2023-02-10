import { Product } from '../../model/product.model';
import { CartService } from '../../service/cart.service';

export class CartController {
    private service: CartService;
    constructor() {
        this.service = new CartService();
    }
    public getProducts(): Product[] {
        return this.service.getProducts();
    }

    public add(product: Product): void {
        this.service.add(product);
    }

    public delete(id: number): void {
        this.service.delete(id);
    }
}
