import { ProductCard } from '../../components/productCard/productCard.view';
import { Product } from '../../model/Product.model';
import { Options } from './catalog.controller';
import template from './catalog.template.html';
import './catalog.style.css';

export class Catalog {
    private readonly id: string;
    constructor(id: string) {
        this.id = id;
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

        const option = new Options();
        const products = option.getAll();

        // products.forEach((element: Product) => {
        //     const product = new ProductCard('catalogProducts');
        //     product.render(element);
        // });

        catalog.appendChild(catalogHead);
        catalog.appendChild(catalogProducts);
        main.appendChild(catalog);
        body.appendChild(main);
    }
}
