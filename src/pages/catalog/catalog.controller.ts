import { Product, ProductModel } from '../../model/product.model';
import { Options } from '../../components/listCard/listCard.view';
import { sortASC, sortDESC } from '../../utils/sort';

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

    public sort(products: Product[], value: string): Product[] {
        if (value === 'price-ASC') {
            return products.sort(sortASC<Product>('price'));
        }

        if (value === 'price-DESC') {
            return products.sort(sortDESC<Product>('price'));
        }

        if (value === 'rating-ASC') {
            return products.sort(sortASC<Product>('rating'));
        }

        if (value === 'rating-DESC') {
            return products.sort(sortDESC<Product>('rating'));
        }

        if (value === 'discount-ASC') {
            return products.sort(sortASC<Product>('discountPercentage'));
        }

        if (value === 'discount-DESC') {
            return products.sort(sortDESC<Product>('discountPercentage'));
        }
    }
}
