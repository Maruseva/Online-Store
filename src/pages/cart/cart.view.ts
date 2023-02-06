import { Card } from '../../components/card/card.view';
import { ModalWidowPay } from '../../components/modalWidowPay/modalWidowPay.view';
import { ProductInRow } from '../../components/productInRow/productInRow.view';
import { Product } from '../../model/product.model';
import './cart.style.css';

export class Cart {
    private readonly id: string;
    private productInRow: ProductInRow;
    private card: Card;
    private modalWindow: ModalWidowPay;
    constructor(id: string) {
        this.id = id;
        this.productInRow = new ProductInRow('productsRows');
        this.card = new Card('cartWrap');
        this.modalWindow = new ModalWidowPay(this.id);
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
        this.renderProductsRows(productsCart);

        const priceAll = productsCart.reduce((sum, element) => sum + element.price, 0);

        const content = `<div class="content_wrap">
        <p>Products: <span>${productsCart.length}</span></p>
        <p>Total: <span>&#8364;${priceAll}</span></p>
        <input type="search" id="search" placeholder="Enter promo code">
        <button class="cart__buy">BUY NOW</button>
        </div>`;
        this.card.renderCard('Summary', content);

        select.addEventListener('change', (event) => {
            select.value = (event.target as HTMLSelectElement).value;
            this.clearProductsRows();
            this.renderProductsRows(productsCart);
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
                    this.renderProductsRows(productsCart);
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
                    this.renderProductsRows(productsCart);
                }
            }
        });

        const buyButton = <HTMLButtonElement>document.querySelector('button.cart__buy');
        buyButton.addEventListener('click', () => this.modalWindow.render());
    }

    public renderProductsRows(productsCart: Product[]): void {
        const select = <HTMLSelectElement>document.querySelector('select.productsTitle_select');
        const limit = parseInt(select.value);
        const span = <HTMLSpanElement>document.querySelector('span[data-page]');
        const atr = span.getAttribute('data-page');
        if (atr) {
            const page = parseInt(atr);

            const productsInPage = productsCart.slice(limit * (page - 1), limit * page);
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
