import { Product, ProductModel } from '../../model/product.model';
import { Options } from '../../components/listCard/listCard.view';

export class CatalogController {
    private model: ProductModel;
    constructor() {
        this.model = new ProductModel();
    }
    public getAll(): Product[] {
        return this.model.getAll();
    }

    public getCategory(products: Product[]): Options[] {
        const options: Options[] = [];

        const parameter: string[] = products.map((element) => element.category);
        const category = new Set(parameter);

        category.forEach((element) => {
            options.push({ category: element, totalQuantity: 0, displayQuantity: 0 });
        });

        parameter.forEach((element) => {
            options.forEach((item) => {
                if (element === item.category) {
                    item.totalQuantity += 1;
                }
            });
        });

        return options;
    }

    public getBrand(products: Product[]): Options[] {
        const options: Options[] = [];

        const parameter: string[] = products.map((element) => element.brand);
        const brand = new Set(parameter);

        brand.forEach((element) => {
            options.push({ category: element, totalQuantity: 0, displayQuantity: 0 });
        });

        parameter.forEach((element) => {
            options.forEach((item) => {
                if (element === item.category) {
                    item.totalQuantity += 1;
                }
            });
        });

        return options;
    }
}
