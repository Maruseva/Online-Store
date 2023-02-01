import template from './header.template.html';
import './header.style.css';
import { changePagesUrl } from '../../utils/url';
import { CartService } from '../../service/cart.service';

export class HeaderView {
    private readonly id: string;
    private service: CartService;
    constructor(id: string) {
        this.id = id;
        this.service = new CartService();
    }
    public render(): void {
        const body = <HTMLBodyElement>document.getElementById(this.id);
        const header = <HTMLElement>document.createElement('header');
        header.innerHTML = template;
        body.appendChild(header);

        const logo = <HTMLImageElement>document.querySelector('img[class="header_logo"]');
        logo.addEventListener('click', () => {
            const url = window.location.origin;
            changePagesUrl(url, '');
        });

        const cart = <HTMLImageElement>document.querySelector('img[class="header_basket"]');
        cart.addEventListener('click', () => {
            const url = window.location.origin;
            changePagesUrl(url, 'cart');
        });

        const products = this.service.getProducts();

        if (products.length) {
            let priceAll = 0;
            products.forEach((element) => (priceAll += element.price));
            const price = <HTMLSpanElement>document.querySelector('span[class="header_price"]');
            price.innerHTML = `&#8364;${priceAll}`;

            const number = <HTMLDivElement>document.querySelector('div[class="header_numder"]');
            number.innerHTML = products.length.toString();
        }
    }
}
