import { Card } from '../../components/card/card.view';
import { ProductInRow } from '../../components/productInRow/productInRow.view';
import { Product } from '../../model/product.model';
import './cart.style.css';

export class Cart {
    private readonly id: string;
    productInRow: ProductInRow;
    card: Card;
    constructor(id: string) {
        this.id = id;
        this.productInRow = new ProductInRow('productsRows');
        this.card = new Card('cartWrap');
    }

    render(productsCart: Product[]): void {
        const body = <HTMLBodyElement>document.getElementById(this.id);
        const cartWrap = <HTMLDivElement>document.createElement('div');
        const productsInCart = <HTMLDivElement>document.createElement('div');
        const productsTitle = <HTMLDivElement>document.createElement('div');
        const productsRows = <HTMLDivElement>document.createElement('div');
        const summary = <HTMLDivElement>document.createElement('div');
        cartWrap.id = 'cartWrap';
        productsInCart.className = 'productsInCart';
        productsTitle.className = 'productsTitle';
        productsRows.id = 'productsRows';
        productsInCart.appendChild(productsTitle);
        productsInCart.appendChild(productsRows);
        cartWrap.appendChild(summary);
        cartWrap.appendChild(productsInCart);
        body.appendChild(cartWrap);

        productsTitle.innerHTML = `
        <span>Products In Cart</span>
        <div class="page"><div>LIMIT: 1</div>
            <div class="page_buttons">PAGE: <button><</button><span>1</span><button>></button></div>
        </div>`;

        productsCart.forEach((element, index) => {
            this.productInRow.render(element);
            const num = <NodeListOf<Element>>document.querySelectorAll('div[class="number"]');
            num[index].innerHTML = (index + 1).toString();
        });

        const content = `<div class="content_wrap">
        <p>Products: <span>4</span></p>
        <p>Total: <span>&#8364;</span></p>
        <input type="search" id="search" placeholder="Enter promo code">
        <button>BUY NOW</button>
        </div>`;

        this.card.renderCard('Summary', content);
    }
}
