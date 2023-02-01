import template from './header.template.html';
import './header.style.css';
import { changePagesUrl } from '../../utils/url';

export class HeaderView {
    private readonly id: string;
    constructor(id: string) {
        this.id = id;
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
    }
}
