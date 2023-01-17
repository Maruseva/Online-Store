import { ProductCard } from '../../components/productCard/productCard.view';
import { Product } from '../../model/product.model';
import { CatalogController } from './catalog.controller';
import { ListCard } from '../../components/listCard/listCard.view';
import template from './catalog.template.html';
import './catalog.style.css';
import { SliderCard } from '../../components/sliderCard/sliderCard.view';
import { changeUrl } from '../../utils/url';

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

        const catalogHeadText = document.getElementsByClassName('catalogHead_text');
        const span = document.createElement('span');
        span.innerText = `Found: ${products.length}`;
        catalogHeadText[0].appendChild(span);

        const product = new ProductCard('catalogProducts');

        const url = new URL(window.location.href);
        const urlValue = url.searchParams.get('view-mode');

        products.forEach((element: Product) => {
            if (urlValue === 'small') {
                product.renderSmallCard(element);
            }

            if (urlValue === 'big') {
                product.renderBigCard(element);
            }
        });

        const category = this.controller.getCategory(products);
        const brand = this.controller.getBrand(products);

        const list = new ListCard('menu');
        list.render('Category', category);
        list.render('Brand', brand);

        const slider = new SliderCard('menu');
        slider.render('jhbfjhr', { min: 123, max: 5959 });

        const modeSmall = <HTMLImageElement>document.getElementById('mode_small');
        const modeBig = <HTMLImageElement>document.getElementById('mode_big');

        modeSmall.addEventListener('click', () => {
            changeUrl('view-mode', 'small');
        });

        modeBig.addEventListener('click', () => {
            changeUrl('view-mode', 'big');
        });
    }

    public clear(): void {
        const header = document.getElementsByTagName('header');
        const main = document.getElementsByTagName('main');
        const footer = document.getElementsByTagName('footer');
        header[0].remove();
        main[0].remove();
        footer[0].remove();
    }
}
