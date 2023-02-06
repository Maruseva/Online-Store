import { Card } from '../../components/card/card.view';
import { HeaderView } from '../../components/header/header.view';
import { ProductInRow } from '../../components/productInRow/productInRow.view';
import { CatalogController } from '../../controller/catalog.controller';
import { Product } from '../../model/product.model';
import { changePagesUrl } from '../../utils/url';
import { CartController } from './cart.controller';
import './cart.style.css';

export class Cart {
    private readonly id: string;
    private productInRow: ProductInRow;
    private card: Card;
    private cartController: CartController;
    private catalogController: CatalogController;
    private header: HeaderView;
    constructor(id: string) {
        this.id = id;
        this.productInRow = new ProductInRow('productsRows');
        this.card = new Card('cartWrap');
        this.catalogController = new CatalogController();
        this.cartController = new CartController();
        this.header = new HeaderView(this.id);
    }

    public render(productsCart: Product[]): void {
        const body = <HTMLBodyElement>document.getElementById(this.id);
        const cartWrap = <HTMLDivElement>document.createElement('div');
        const summary = <HTMLDivElement>document.createElement('div');
        cartWrap.id = 'cartWrap';
        cartWrap.appendChild(summary);
        body.appendChild(cartWrap);

        cartWrap.innerHTML = `<div class="productsInCart">
        <div class="productsTitle">
          <span>Products In Cart</span>
          <div class="page"><div class="productsTitle_limit"><span>LIMIT:</span> <select class="productsTitle_select" size="1" multiple></select></div>
              <div class="page_buttons">PAGE: <button class="previous"><</button><span data-page="1">1</span><button class="next">></button></div>
          </div>
        </div>
        <div id="productsRows"></div>
      </div>`;

        const select = <HTMLSelectElement>document.querySelector('select.productsTitle_select');

        productsCart.forEach((element, index) => {
            const option = <HTMLOptionElement>document.createElement('option');
            option.value = (index + 1).toString();
            option.innerText = (index + 1).toString();
            select.appendChild(option);
        });

        const numberProductsInPage = 3;
        select.value =
            productsCart.length < numberProductsInPage
                ? productsCart.length.toString()
                : numberProductsInPage.toString();
        this.renderProductsRows();

        const priceAll = productsCart.reduce((sum, element) => sum + element.price, 0);

        const content = `<div class="content_wrap">
        <p>Products: <span>${productsCart.length}</span></p>
        <p>Total: <span>&#8364;${priceAll}</span></p>
        <input type="search" id="search" placeholder="Enter promo code">
        <button>BUY NOW</button>
        </div>`;
        this.card.renderCard('Summary', content);

        select.addEventListener('change', (event) => {
            select.value = (event.target as HTMLSelectElement).value;
            this.clearProductsRows();
            this.renderProductsRows();
        });

        const previous = <HTMLButtonElement>document.querySelector('button.previous');
        const next = <HTMLButtonElement>document.querySelector('button.next');

        previous.addEventListener('click', () => {
            const span = <HTMLSpanElement>document.querySelector('span[data-page]');
            const atr = span.getAttribute('data-page');
            if (atr) {
                let page = parseInt(atr);
                if (page > 1) {
                    page -= 1;
                    span.innerText = page.toString();
                    span.setAttribute('data-page', page.toString());
                    this.clearProductsRows();
                    this.renderProductsRows();
                }
            }
        });

        next.addEventListener('click', () => {
            const span = <HTMLSpanElement>document.querySelector('span[data-page]');
            const atr = span.getAttribute('data-page');
            if (atr) {
                let page = parseInt(atr);
                if (productsCart.length > parseInt(select.value) * page) {
                    page += 1;
                    span.innerText = page.toString();
                    span.setAttribute('data-page', page.toString());
                    this.clearProductsRows();
                    this.renderProductsRows();
                }
            }
        });

        const productsInRows = <HTMLImageElement>document.getElementById('productsRows');
        productsInRows.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const card = target.closest('div.wrap') as HTMLDivElement;
            const id = card.getAttribute('data-id');
            if (id && target.className === 'add_to_cart') {
                const product = this.catalogController.getItemById(parseInt(id));
                if (product) {
                    this.cartController.add(product);
                    this.header.update();
                    this.clearProductsRows();
                    this.renderProductsRows();
                }
            } else if (id && target.className === 'drop_from_cart') {
                this.cartController.delete(parseInt(id));
                this.header.update();
                this.clearProductsRows();
                this.renderProductsRows();
            } else if (id) {
                const url = window.location.origin;
                changePagesUrl(url, 'product-details', id);
            }
        });
    }

    public renderProductsRows(): void {
        const productsCart = this.cartController.getProducts();
        const arrId: number[] = [];
        const productsCartWithoutRepeats = [];

        productsCart.forEach((element) => arrId.push(element.id));
        const arrIdWithoutRepeats = new Set(arrId);
        arrIdWithoutRepeats.forEach((element) => {
            const product = this.catalogController.getItemById(element);
            productsCartWithoutRepeats.push(product);
        });

        arrId.forEach((element) => {
            debugger;
            productsCartWithoutRepeats.forEach((item) => {
                if (element === item.id && !item.number) {
                    item.number = 1;
                } else if (element === item.id && item.number) {
                    item.number += 1;
                }
            });
        });
        console.log(productsCartWithoutRepeats);

        const select = <HTMLSelectElement>document.querySelector('select.productsTitle_select');
        const limit = parseInt(select.value);
        const span = <HTMLSpanElement>document.querySelector('span[data-page]');
        const atr = span.getAttribute('data-page');
        if (atr) {
            const page = parseInt(atr);

            const productsInPage = productsCartWithoutRepeats.slice(limit * (page - 1), limit * page);
            let index = limit * (page - 1) + 1;

            productsInPage.forEach((element) => {
                this.productInRow.render(element, index);
                index++;
            });
        }
    }

    public clearProductsRows(): void {
        const productsRows = <HTMLDivElement>document.getElementById('productsRows');
        productsRows.innerHTML = '';
    }
}
