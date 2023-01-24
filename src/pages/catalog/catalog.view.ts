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

        const filterCategory = <HTMLDivElement>document.getElementById('category');
        filterCategory.addEventListener('change', (event) => {
            const url = window.location.href;
            if ((event.target as HTMLInputElement).checked) {
                setParamsUrl(url, 'category', (event.target as HTMLInputElement).value);
            } else {
                deleteParamsUrl(url, 'category', (event.target as HTMLInputElement).value);
            }
        });

        const filterBrand = <HTMLDivElement>document.getElementById('brand');
        filterBrand.addEventListener('change', (event) => {
            const url = window.location.href;
            if ((event.target as HTMLInputElement).checked) {
                setParamsUrl(url, 'brand', (event.target as HTMLInputElement).value);
            } else {
                deleteParamsUrl(url, 'brand', (event.target as HTMLInputElement).value);
            }
        });

        const price = products.map((element) => element.price);
        const minPrice = Math.min(...price);
        const maxPrice = Math.max(...price);

        const stock = products.map((element) => element.stock);
        const minStock = Math.min(...stock);
        const maxStock = Math.max(...stock);

        const slider = new SliderCard('menu');
        slider.render('Price', { min: minPrice, max: maxPrice });
        slider.render('Stock', { min: minStock, max: maxStock });

        const inputPriceMin = document.getElementsByClassName('price_min');
        inputPriceMin[0].addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            console.log(target.nextElementSibling.value);
            if (event.target.value > target.nextElementSibling.value) {
                event.target.value = target.nextElementSibling.value;
            }
            console.log(inputPriceMin[0].value);
            const text = <HTMLSpanElement>document.getElementById('price_text_min');
            text.innerText = (event.target as HTMLInputElement).value;
            const url = window.location.href;
            changeUrl(url, 'price-min', (event.target as HTMLInputElement).value);
        });

        const inputPriceMax = document.getElementsByClassName('price_max');
        inputPriceMax[0].addEventListener('input', (event) => {
            const text = <HTMLSpanElement>document.getElementById('price_text_max');
            text.innerText = (event.target as HTMLInputElement).value;
            const url = window.location.href;
            changeUrl(url, 'price-max', (event.target as HTMLInputElement).value);
        });

        const inputStockMin = document.getElementsByClassName('stock_min');
        inputStockMin[0].addEventListener('input', (event) => {
            const text = <HTMLSpanElement>document.getElementById('stock_text_min');
            text.innerText = (event.target as HTMLInputElement).value;
            const url = window.location.href;
            changeUrl(url, 'stock-min', (event.target as HTMLInputElement).value);
        });

        const inputStockMax = document.getElementsByClassName('stock_max');
        inputStockMax[0].addEventListener('input', (event) => {
            const text = <HTMLSpanElement>document.getElementById('stock_text_max');
            text.innerText = (event.target as HTMLInputElement).value;
            const url = window.location.href;
            changeUrl(url, 'stock-max', (event.target as HTMLInputElement).value);
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
                const category = <HTMLDivElement>document.getElementById('category');
                const input = <HTMLInputElement>category.querySelector(`input[value="${element}"]`);
                input.checked = true;
            });
            products = this.controller.filter(products, 'category', urlValuesCategory);
        }

        const urlValuesBrand = getAllParams(url, 'brand');
        if (urlValuesBrand && urlValuesBrand.length > 0) {
            urlValuesBrand.forEach((element) => {
                const brand = <HTMLDivElement>document.getElementById('brand');
                const input = <HTMLInputElement>brand.querySelector(`input[value="${element}"]`);
                input.checked = true;
            });
            products = this.controller.filter(products, 'brand', urlValuesBrand);
        }

        const urlValuePriceMin = getUrlValue(url, 'price-min');
        const urlValuePriceMax = getUrlValue(url, 'price-max');

        const inputPriceMin = document.getElementsByClassName('price_min');
        const inputPriceMax = document.getElementsByClassName('price_max');
        const textMin = <HTMLSpanElement>document.getElementById('price_text_min');
        const textMax = <HTMLSpanElement>document.getElementById('price_text_max');

        if (urlValuePriceMin) {
            inputPriceMin[0].value = urlValuePriceMin;
            textMin.innerHTML = urlValuePriceMin;
            products = this.controller.slider(products, 'price', { min: urlValuePriceMin });
        }
        if (urlValuePriceMax) {
            inputPriceMax[0].value = urlValuePriceMax;
            textMax.innerHTML = urlValuePriceMax;
            products = this.controller.slider(products, 'price', { max: urlValuePriceMax });
        }
        if (!urlValuePriceMin && !urlValuePriceMax && products.length) {
            const price = products.map((element) => element.price);
            const minPrice = Math.min(...price);
            const maxPrice = Math.max(...price);
            inputPriceMin[0].value = minPrice;
            textMin.innerHTML = minPrice;
            inputPriceMax[0].value = maxPrice;
            textMax.innerHTML = maxPrice;
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
