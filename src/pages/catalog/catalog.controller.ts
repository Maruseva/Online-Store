import { Product, ProductModel } from '../../model/Product.model';

export class Options {
    public getAll(): Product[] {
        const data = new ProductModel();
        return data.getAll();
    }
    // public getOptions(): Partial<Product> {
    //     document.addEventListener('click', (event) => {
    //         return parameter;
    //     });
    // }
}
