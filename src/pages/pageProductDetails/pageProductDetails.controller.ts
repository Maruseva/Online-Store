import { Product, ProductModel } from '../../model/product.model';

export class ProductDetailsController {
    private model: ProductModel;
    constructor() {
        this.model = new ProductModel();
    }
    public getItemById(id: number): Product | undefined {
        return this.model.getItemById(id);
    }
}
