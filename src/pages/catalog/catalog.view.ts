import { ProductCard } from '../../components/productCard/productCard.view';
import { Product, ProductModel } from '../../model/Product.model';
import { Options } from './catalog.controller';

export class Catalog {
    private readonly id: string;
    constructor(id: string) {
        this.id = id;
    }
    public render(): void {
        const option = new Options();
        const parameter = option.getOptions();

        const data = new ProductModel();
        const products = data.getAll();

        for (const key in parameter) {
            const result = products.filter((item) => {
                item[key] === parameter[key];
            });

            result.forEach((element: Product) => {
                const product = new ProductCard(this.id);
                product.render(element);
            });
        }
    }
}
