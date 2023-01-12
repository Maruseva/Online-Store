import { ProductCard } from '../../components/productCard/productCard.view';
import { Product } from '../../model/product.model';
import { CatalogController } from './catalog.controller';
import { ListCard } from '../../components/listCard/listCard.view';
import template from './catalog.template.html';
import './catalog.style.css';
import { SliderCard } from '../../components/sliderCard/sliderCard.view';

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
        const menu = <HTMLDivElement>document.createElement('div');
        const catalog = <HTMLDivElement>document.createElement('div');
        const catalogHead = <HTMLDivElement>document.createElement('div');
        const catalogProducts = <HTMLDivElement>document.createElement('div');
        catalog.className = 'catalog';
        catalogHead.className = 'catalogHead';
        catalogHead.innerHTML = template;
        catalogProducts.id = 'catalogProducts';
        menu.id = 'menu';

        const products = this.controller.getAll();

        catalog.appendChild(catalogHead);
        catalog.appendChild(catalogProducts);
        main.appendChild(menu);
        main.appendChild(catalog);
        body.appendChild(main);

        const product = new ProductCard('catalogProducts');

        products.forEach((element: Product) => {
            product.render(element);
        });

        const list = new ListCard('menu');
        list.render('Brand', [{ category: 'string', totalQuantity: 6, displayQuantity: 3 }]);

        const slider = new SliderCard('menu');
        slider.render('jhbfjhr', { min: 123, max: 5959 });
    }
}
