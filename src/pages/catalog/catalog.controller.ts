import { Product, ProductModel } from '../../model/Product.model';

export class CatalogController {
    private model: ProductModel;
    constructor() {
        this.model = new ProductModel();
    }
    public getAll(): Product[] {
        return this.model.getAll();
    }
    // public getOptions(): Partial<Product> {
    //     document.addEventListener('click', (event) => {
    //         return parameter;
    //     });
    // }
}
