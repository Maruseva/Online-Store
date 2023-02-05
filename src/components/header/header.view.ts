import template from './header.template.html';
import './header.style.css';
import { changePagesUrl } from '../../utils/url';
import { CartController } from '../../pages/cart/cart.controller';

export class HeaderView {
    private readonly id: string;
    private cartController: CartController;
    constructor(id: string) {
        this.id = id;
        this.cartController = new CartController();
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

        const cart = <HTMLImageElement>document.querySelector('div[class="header_cart"]');
        cart.addEventListener('click', () => {
            const url = window.location.origin;
            changePagesUrl(url, 'cart');
        });

        const products = this.cartController.getProducts();
        if (products.length) {
            this.update();
        }
    }

    public update(): void {
        const products = this.cartController.getProducts();

        const price = <HTMLSpanElement>document.querySelector('span[class="header_price"]');
        const number = <HTMLDivElement>document.querySelector('div[class="header_numder"]');

        if (products.length) {
            const priceAll = products.reduce((sum, element) => sum + element.price, 0);
            price.innerHTML = `&#8364;${priceAll}`;
            number.innerHTML = products.length.toString();
        } else {
            price.innerHTML = `&#8364;0`;
            number.innerHTML = '0';
        }
    }
}
