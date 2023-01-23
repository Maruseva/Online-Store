import { ProductCard } from '../../components/productCard/productCard.view';
import { Product } from '../../model/product.model';
import { CatalogController } from './catalog.controller';
import { ListCard } from '../../components/listCard/listCard.view';
import template from './catalog.template.html';
import './catalog.style.css';
import { SliderCard } from '../../components/sliderCard/sliderCard.view';
import { changeUrl, deleteParamsUrl, getAllParams, getUrlValue, setParamsUrl } from '../../utils/url';

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

        catalog.appendChild(catalogHead);
        catalog.appendChild(catalogProducts);
        main.appendChild(menu);
        main.appendChild(catalog);
        body.appendChild(main);

        const modeSmall = <HTMLImageElement>document.getElementById('mode_small');
        const modeBig = <HTMLImageElement>document.getElementById('mode_big');

        modeSmall.addEventListener('click', () => {
            const url = window.location.href;
            changeUrl(url, 'view-mode', 'small');
        });

        modeBig.addEventListener('click', () => {
            const url = window.location.href;
            changeUrl(url, 'view-mode', 'big');
        });

        const select = <HTMLSelectElement>document.getElementById('select_sort');
        select.addEventListener('change', (event) => {
            const url = window.location.href;
            const value = (event.target as HTMLSelectElement).value;
            changeUrl(url, 'sort', value);
        });

        const search = <HTMLInputElement>document.getElementById('search');
        search.addEventListener('input', () => {
            const url = window.location.href;
            changeUrl(url, 'search', search.value);
        });

        this.renderFilters();
        this.renderCatalog();
    }

    public renderFilters(): void {
        const products = this.controller.getAll();

        const category = this.controller.getCategory(products);
        const brand = this.controller.getBrand(products);

        const list = new ListCard('menu');
        list.render('Category', category);
        list.render('Brand', brand);

        const slider = new SliderCard('menu');
        slider.render('jhbfjhr', { min: 123, max: 5959 });

        const options = document.getElementsByClassName('options_wrap');

        options[0].addEventListener('change', (event) => {
            const url = window.location.href;
            if ((event.target as HTMLInputElement).checked) {
                setParamsUrl(url, 'category', (event.target as HTMLInputElement).value);
            } else {
                deleteParamsUrl(url, 'category', (event.target as HTMLInputElement).value);
            }
        });

        options[1].addEventListener('change', (event) => {
            const url = window.location.href;
            if ((event.target as HTMLInputElement).checked) {
                setParamsUrl(url, 'brand', (event.target as HTMLInputElement).value);
            } else {
                deleteParamsUrl(url, 'brand', (event.target as HTMLInputElement).value);
            }
        });
    }

    public renderCatalog(): void {
        let products = this.controller.getAll();
        const url = window.location.href;

        const urlValueSearch = getUrlValue(url, 'search');
        if (urlValueSearch) {
            const search = <HTMLInputElement>document.getElementById('search');
            search.value = urlValueSearch;
            products = this.controller.search(products, urlValueSearch);
        }

        const urlValueSort = getUrlValue(url, 'sort');
        if (urlValueSort) {
            const select = <HTMLSelectElement>document.getElementById('select_sort');
            select.value = urlValueSort;
            products = this.controller.sort(products, urlValueSort);
        }

        const urlValuesCategory = getAllParams(url, 'category');
        if (urlValuesCategory && urlValuesCategory.length > 0) {
            urlValuesCategory.forEach((element) => {
                const input = <HTMLInputElement>document.getElementById(element);
                input.checked = true;
            });
            products = this.controller.filter(products, 'category', urlValuesCategory);
        }

        const urlValuesBrand = getAllParams(url, 'brand');
        if (urlValuesBrand && urlValuesBrand.length > 0) {
            urlValuesBrand.forEach((element) => {
                const input = <HTMLInputElement>document.getElementById(element);
                input.checked = true;
            });
            products = this.controller.filter(products, 'brand', urlValuesBrand);
        }

        const product = new ProductCard('catalogProducts');
        const urlValueViewMode = getUrlValue(url, 'view-mode');

        products.forEach((element: Product) => {
            if (urlValueViewMode === 'small') {
                product.renderSmallCard(element);
            } else {
                product.renderBigCard(element);
            }
        });

        const catalogHeadText = document.getElementsByClassName('catalogHead_text');
        catalogHeadText[0].innerHTML = `<span>Found: ${products.length}</span>`;
    }

    public clearCatalog(): void {
        const catalogProducts = <HTMLDivElement>document.getElementById('catalogProducts');
        catalogProducts.innerHTML = '';
    }
}
