import { Card } from '../../components/card/card.view';
import { ProductInRow } from '../../components/productInRow/productInRow.view';
import { Product } from '../../model/product.model';
import './cart.style.css';

export class Cart {
    private readonly id: string;
    private productInRow: ProductInRow;
    private card: Card;
    constructor(id: string) {
        this.id = id;
        this.productInRow = new ProductInRow('productsRows');
        this.card = new Card('cartWrap');
    }

    public render(productsCart: Product[]): void {
        const body = <HTMLBodyElement>document.getElementById(this.id);
        const cartWrap = <HTMLDivElement>document.createElement('div');
        const summary = <HTMLDivElement>document.createElement('div');
        cartWrap.id = 'cartWrap';
        cartWrap.appendChild(summary);
        body.appendChild(cartWrap);

        let page = 1;

        cartWrap.innerHTML = `<div class="productsInCart">
        <div class="productsTitle">
          <span>Products In Cart</span>
          <div class="page"><div class="productsTitle_limit"><span>LIMIT:</span> <select class="productsTitle_select" size="1" multiple></select></div>
              <div class="page_buttons">PAGE: <button class="previous"><</button><span data_page="${page}">${page}</span><button class="next">></button></div>
          </div>
        </div>
        <div id="productsRows"></div>
      </div>`;

        const select = <HTMLSelectElement>document.querySelector('select[class="productsTitle_select"]');

        if (productsCart.length) {
            productsCart.forEach((element, index) => {
                const option = <HTMLOptionElement>document.createElement('option');
                option.value = (index + 1).toString();
                option.innerText = (index + 1).toString();
                select.appendChild(option);
            });

            select.value = productsCart.length <= 2 ? productsCart.length.toString() : '3';
            this.renderProductsRows(productsCart);
        }

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
            this.renderProductsRows(productsCart);
        });

        const previous = <HTMLButtonElement>document.querySelector('button[class="previous"]');
        const next = <HTMLButtonElement>document.querySelector('button[class="next"]');

        previous.addEventListener('click', () => {
            if (page > 1) {
                page -= 1;
                const span = <HTMLSpanElement>document.querySelector('span[data_page]');
                span.innerText = page.toString();
                span.setAttribute('data_page', page.toString());
                this.clearProductsRows();
                this.renderProductsRows(productsCart);
            }
        });

        next.addEventListener('click', () => {
            if (productsCart.length > parseInt(select.value) * page) {
                page += 1;
                const span = <HTMLSpanElement>document.querySelector('span[data_page]');
                span.innerText = page.toString();
                span.setAttribute('data_page', page.toString());
                this.clearProductsRows();
                this.renderProductsRows(productsCart);
            }
        });
    }

    public renderProductsRows(productsCart: Product[]): void {
        const select = <HTMLSelectElement>document.querySelector('select[class="productsTitle_select"]');
        const limit = parseInt(select.value);
        const span = <HTMLSpanElement>document.querySelector('span[data_page]');
        const atr = span.getAttribute('data_page');
        if (atr) {
            const page = parseInt(atr);

            productsCart.forEach((element, index) => {
                if (limit * (page - 1) <= index && index < limit * page) {
                    this.productInRow.render(element, index + 1);
                }
            });
        }
    }

    public clearProductsRows(): void {
        const productsRows = <HTMLDivElement>document.getElementById('productsRows');
        productsRows.innerHTML = '';
    }
}
