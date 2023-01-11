import { ProductCard } from '../../components/productCard/productCard.view';
import { Product } from '../../model/Product.model';
import { CatalogController } from './catalog.controller';
import template from './catalog.template.html';
import './catalog.style.css';

export class Catalog {
    private readonly id: string;
    private controller: CatalogController;
    constructor(id: string) {
        this.id = id;
        this.controller = new CatalogController();
    }
    public render(): void {
        const body = <HTMLBodyElement>document.getElementById(this.id);
        const main = <HTMLElement>document.createElement('main');
        const catalog = <HTMLDivElement>document.createElement('div');
        const catalogHead = <HTMLDivElement>document.createElement('div');
        const catalogProducts = <HTMLDivElement>document.createElement('div');
        catalog.className = 'catalog';
        catalogHead.className = 'catalogHead';
        catalogHead.innerHTML = template;
        catalogProducts.id = 'catalogProducts';

        const products = this.controller.getAll();

        catalog.appendChild(catalogHead);
        catalog.appendChild(catalogProducts);
        main.appendChild(catalog);
        body.appendChild(main);

        const product = new ProductCard('catalogProducts');

        products.forEach((element: Product) => {
            product.render(element);
        });
    }
}
