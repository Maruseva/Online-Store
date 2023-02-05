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

    render(productsCart: Product[]): void {
        const body = <HTMLBodyElement>document.getElementById(this.id);
        const cartWrap = <HTMLDivElement>document.createElement('div');
        const summary = <HTMLDivElement>document.createElement('div');
        cartWrap.id = 'cartWrap';
        cartWrap.appendChild(summary);
        body.appendChild(cartWrap);

        cartWrap.innerHTML = `<div class="productsInCart">
        <div class="productsTitle">
          <span>Products In Cart</span>
          <div class="page"><div>LIMIT: 1</div>
              <div class="page_buttons">PAGE: <button><</button><span>1</span><button>></button></div>
          </div>
        </div>
        <div id="productsRows"></div>
      </div>`;

        if (productsCart.length) {
            productsCart.forEach((element, index) => {
                this.productInRow.render(element, index + 1);
            });
        }

        const priceAll = productsCart.reduce((sum, element) => sum + element.price, 0);

        const content = `<div class="content_wrap">
        <p>Products: <span>${productsCart.length}</span></p>
        <p>Total: <span>&#8364;${priceAll}</span></p>
        <input type="search" id="search" placeholder="Enter promo code">
        <button>BUY NOW</button>
        </div>`;
        this.card.renderCard('Summary', content);

        const productsInRows = <HTMLImageElement>document.getElementById('productsRows');
        productsInRows.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const card = target.closest('div[class="wrap"]') as HTMLDivElement;
            const id = card.getAttribute('data-id');
            if (id && target.className === 'add_to_cart') {
                const product = this.catalogController.getItemById(parseInt(id));
                if (product) {
                    this.cartController.add(product);
                    this.header.update();
                }
            } else if (id && target.className === 'drop_from_cart') {
                this.cartController.delete(parseInt(id));
                this.header.update();
            } else if (id) {
                const url = window.location.origin;
                changePagesUrl(url, 'product-details', id);
            }
        });
    }
}
