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
}

export class ListFilter {
    public getCategory(products: Product[]): Options[] {
        const parameter: string[] = [];
        const options: Options[] = [];
        products.forEach((element) => {
            parameter.push(element.category);
        });

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
        const parameter: string[] = [];
        const options: Options[] = [];
        products.forEach((element) => {
            parameter.push(element.brand);
        });

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
}
