import { ProductCard } from '../../components/productCard/productCard.view';
import { Product } from '../../model/product.model';
import { CatalogController } from './catalog.controller';
import { ListCard } from '../../components/listCard/listCard.view';
import template from './catalog.template.html';
import './catalog.style.css';
import { SliderCard } from '../../components/sliderCard/sliderCard.view';
import { changePagesUrl, changeUrl, deleteParamsUrl, getAllParams, getUrlValue, setParamsUrl } from '../../utils/url';
import { getMinMax } from '../../utils/sort';
import { ProductDetailsController } from '../pageProductDetails/pageProductDetails.controller';
import { CartService } from '../../service/cart.service';
import { HeaderView } from '../../components/header/header.view';

export class Catalog {
    public state: boolean = false;
    private readonly id: string;
    private controller: CatalogController;
    private list: ListCard;
    private slider: SliderCard;
    private product: ProductCard;
    private productDetails: ProductDetailsController;
    private service: CartService;
    header: HeaderView;
    constructor(id: string) {
        this.id = id;
        this.controller = new CatalogController();
        this.list = new ListCard('menu');
        this.slider = new SliderCard('menu');
        this.product = new ProductCard('catalogProducts');
        this.productDetails = new ProductDetailsController();
        this.service = new CartService();
        this.header = new HeaderView(this.id);
    }
    public render(): void {
        const body = <HTMLBodyElement>document.getElementById(this.id);
        const main = <HTMLElement>document.createElement('main');
        const menu = <HTMLDivElement>document.createElement('div');
        const buttons = <HTMLDivElement>document.createElement('div');
        const catalog = <HTMLDivElement>document.createElement('div');
        const catalogHead = <HTMLDivElement>document.createElement('div');
        const catalogProducts = <HTMLDivElement>document.createElement('div');
        catalog.className = 'catalog';
        catalogHead.className = 'catalogHead';
        catalogHead.innerHTML = template;
        catalogProducts.id = 'catalogProducts';
        menu.id = 'menu';
        buttons.id = 'buttons';

        catalog.appendChild(catalogHead);
        catalog.appendChild(catalogProducts);
        menu.appendChild(buttons);
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

        catalogProducts.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const card = target.closest('div[class="card_item"]') as HTMLDivElement;
            const id = card.getAttribute('data-id');
            const url = window.location.origin;
            if (id && target.className === 'add_to_cart') {
                const product = this.productDetails.getItemById(parseInt(id));
                if (product) {
                    this.service.add(product);
                    this.header.update();
                }
            } else if (id) {
                changePagesUrl(url, 'product-details', id);
            }
        });

        this.state = true;

        this.renderFilters();
        this.renderCatalog();
    }

    public renderFilters(): void {
        const buttons = <HTMLDivElement>document.getElementById('buttons');
        const buttonReset = <HTMLButtonElement>document.createElement('button');
        const buttonCopy = <HTMLButtonElement>document.createElement('button');
        buttonReset.innerHTML = 'Reset Filtrs';
        buttonCopy.innerHTML = 'Copy Link';

        buttons.appendChild(buttonReset);
        buttons.appendChild(buttonCopy);

        buttonReset.addEventListener('click', () => {
            const url = window.location.origin;
            history.pushState('', '', url);
            window.dispatchEvent(new Event('pushstate'));
        });

        buttonCopy.addEventListener('click', () => {
            setTimeout(() => (buttonCopy.innerHTML = 'Copy Link'), 1000);
            navigator.clipboard.writeText(window.location.href).then(() => (buttonCopy.innerHTML = 'Copied!'));
        });

        const products = this.controller.getAll();

        const category = this.controller.getCategory(products);
        const brand = this.controller.getBrand(products);

        this.list.render('Category', category);
        this.list.render('Brand', brand);

        function handlerFilter(event: Event, name: string): void {
            const url = window.location.href;
            const target = event.target as HTMLInputElement;
            if (target.checked) {
                setParamsUrl(url, name, target.value);
            } else {
                deleteParamsUrl(url, name, target.value);
            }
        }

        const filterCategory = <HTMLDivElement>document.getElementById('category');
        filterCategory.addEventListener('change', (event) => handlerFilter(event, 'category'));

        const filterBrand = <HTMLDivElement>document.getElementById('brand');
        filterBrand.addEventListener('change', (event) => handlerFilter(event, 'brand'));

        const priceAll = new Set(products.map((element) => element.price));
        const price = getMinMax(priceAll);

        const minPrice = price.min;
        const maxPrice = price.max;

        const stockAll = new Set(products.map((element) => element.stock));
        const stock = getMinMax(stockAll);

        const minStock = stock.min;
        const maxStock = stock.max;

        this.slider.render('Price', { min: minPrice, max: maxPrice });
        this.slider.render('Stock', { min: minStock, max: maxStock });

        function handlerInputMin(event: Event, name: string): void {
            const target = event.target as HTMLInputElement;
            const targetNext = target.nextElementSibling as HTMLInputElement;
            if (parseInt(target.value) > parseInt(targetNext.value)) {
                target.value = targetNext.value;
            }
            const text = <HTMLSpanElement>document.getElementById(`${name}_text_min`);
            text.innerText = target.value;
            const url = window.location.href;
            changeUrl(url, `${name}-min`, target.value);
        }

        function handlerInputMax(event: Event, name: string): void {
            const target = event.target as HTMLInputElement;
            const targetPrevious = target.previousElementSibling as HTMLInputElement;
            if (parseInt(target.value) < parseInt(targetPrevious.value)) {
                target.value = targetPrevious.value;
            }
            const text = <HTMLSpanElement>document.getElementById(`${name}_text_max`);
            text.innerText = target.value;
            const url = window.location.href;
            changeUrl(url, `${name}-max`, target.value);
        }

        const inputPriceMin = <HTMLInputElement>document.querySelector('input[class=price_min]');
        inputPriceMin.addEventListener('input', (event) => handlerInputMin(event, 'price'));

        const inputPriceMax = <HTMLInputElement>document.querySelector('input[class=price_max]');
        inputPriceMax.addEventListener('input', (event) => handlerInputMax(event, 'price'));

        const inputStockMin = <HTMLInputElement>document.querySelector('input[class=stock_min]');
        inputStockMin.addEventListener('input', (event) => handlerInputMin(event, 'stock'));

        const inputStockMax = <HTMLInputElement>document.querySelector('input[class=stock_max]');
        inputStockMax.addEventListener('input', (event) => handlerInputMax(event, 'stock'));
    }

    public renderCatalog(): void {
        let products = this.controller.getAll();
        const url = window.location.href;

        const urlValueSearch = getUrlValue(url, 'search');
        const search = <HTMLInputElement>document.getElementById('search');
        if (urlValueSearch) {
            search.value = urlValueSearch;
            products = this.controller.search(products, urlValueSearch);
        } else {
            search.value = '';
        }

        const urlValueSort = getUrlValue(url, 'sort');
        const select = <HTMLSelectElement>document.getElementById('select_sort');
        if (urlValueSort) {
            select.value = urlValueSort;
            products = this.controller.sort(products, urlValueSort);
        } else {
            select.value = 'sort';
        }

        const urlValuesCategory = getAllParams(url, 'category');
        if (urlValuesCategory && urlValuesCategory.length > 0) {
            urlValuesCategory.forEach((element) => {
                const category = <HTMLDivElement>document.getElementById('category');
                const input = <HTMLInputElement>category.querySelector(`input[value="${element}"]`);
                input.checked = true;
            });
            products = this.controller.filter(products, 'category', urlValuesCategory);
        } else {
            const inputs = <NodeListOf<HTMLInputElement>>document.querySelectorAll('input[name="Category"]');
            inputs.forEach((element) => (element.checked = false));
        }

        const urlValuesBrand = getAllParams(url, 'brand');
        if (urlValuesBrand && urlValuesBrand.length > 0) {
            urlValuesBrand.forEach((element) => {
                const brand = <HTMLDivElement>document.getElementById('brand');
                const input = <HTMLInputElement>brand.querySelector(`input[value="${element}"]`);
                input.checked = true;
            });
            products = this.controller.filter(products, 'brand', urlValuesBrand);
        } else {
            const inputs = <NodeListOf<HTMLInputElement>>document.querySelectorAll('input[name="Brand"]');
            inputs.forEach((element) => (element.checked = false));
        }

        const urlValuePriceMin = getUrlValue(url, 'price-min');
        const urlValuePriceMax = getUrlValue(url, 'price-max');

        const texts = document.querySelectorAll('span[class="slider_text_not_found"]');
        texts.forEach((element) => (element.innerHTML = '&#8660;'));

        const inputPriceMin = <HTMLInputElement>document.querySelector('input[class=price_min]');
        const inputPriceMax = <HTMLInputElement>document.querySelector('input[class=price_max]');
        const textMin = <HTMLSpanElement>document.getElementById('price_text_min');
        const textMax = <HTMLSpanElement>document.getElementById('price_text_max');

        if (urlValuePriceMin) {
            inputPriceMin.value = urlValuePriceMin;
            textMin.innerHTML = urlValuePriceMin;
            products = this.controller.slider(products, 'price', { min: parseInt(urlValuePriceMin) });
        }
        if (urlValuePriceMax) {
            inputPriceMax.value = urlValuePriceMax;
            textMax.innerHTML = urlValuePriceMax;
            products = this.controller.slider(products, 'price', { max: parseInt(urlValuePriceMax) });
        }
        if (!urlValuePriceMin && !urlValuePriceMax && products.length) {
            const priceAll = new Set(products.map((element) => element.price));
            const price = getMinMax(priceAll);
            const minPrice = price.min.toString();
            const maxPrice = price.max.toString();
            inputPriceMin.value = minPrice;
            textMin.innerHTML = minPrice;
            inputPriceMax.value = maxPrice;
            textMax.innerHTML = maxPrice;
        }

        const urlValueStockMin = getUrlValue(url, 'stock-min');
        const urlValueStockMax = getUrlValue(url, 'stock-max');

        const inputStockMin = <HTMLInputElement>document.querySelector('input[class=stock_min]');
        const inputStockMax = <HTMLInputElement>document.querySelector('input[class=stock_max]');
        const textMinStock = <HTMLSpanElement>document.getElementById('stock_text_min');
        const textMaxStock = <HTMLSpanElement>document.getElementById('stock_text_max');

        if (urlValueStockMin) {
            inputStockMin.value = urlValueStockMin;
            textMinStock.innerHTML = urlValueStockMin;
            products = this.controller.slider(products, 'stock', { min: parseInt(urlValueStockMin) });
        }
        if (urlValueStockMax) {
            inputStockMax.value = urlValueStockMax;
            textMaxStock.innerHTML = urlValueStockMax;
            products = this.controller.slider(products, 'stock', { max: parseInt(urlValueStockMax) });
        }
        if (!urlValueStockMin && !urlValueStockMax && products.length) {
            const stockAll = new Set(products.map((element) => element.stock));
            const stock = getMinMax(stockAll);
            const minStock = stock.min.toString();
            const maxStock = stock.max.toString();
            inputStockMin.value = minStock;
            textMinStock.innerHTML = minStock;
            inputStockMax.value = maxStock;
            textMaxStock.innerHTML = maxStock;
        }

        const urlValueViewMode = getUrlValue(url, 'view-mode');

        products.forEach((element: Product) => {
            if (urlValueViewMode === 'small') {
                this.product.renderSmallCard(element);
            } else {
                this.product.renderBigCard(element);
            }
        });

        if (!products.length) {
            const catalogProducts = <HTMLDivElement>document.getElementById('catalogProducts');
            catalogProducts.innerHTML = '<div class="not-found">No products found</div>';
            textMin.innerHTML = '';
            textMax.innerHTML = '';
            textMinStock.innerHTML = '';
            textMaxStock.innerHTML = '';
            texts.forEach((element) => (element.innerHTML = 'NOT FOUND'));
        }

        const catalogHeadText = document.getElementsByClassName('catalogHead_text');
        catalogHeadText[0].innerHTML = `<span>Found: ${products.length}</span>`;
    }

    public clearCatalog(): void {
        const catalogProducts = <HTMLDivElement>document.getElementById('catalogProducts');
        catalogProducts.innerHTML = '';
    }
}
