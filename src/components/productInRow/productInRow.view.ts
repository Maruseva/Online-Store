import { Product } from '../../model/product.model';
import './productInRow.style.css';

export class ProductInRow {
    private readonly id: string;
    constructor(id: string) {
        this.id = id;
    }

    render(productsCart: Product, number: number): void {
        const cart = <HTMLDivElement>document.getElementById(this.id);
        const wrap = <HTMLDivElement>document.createElement('div');
        wrap.className = 'wrap';

        wrap.innerHTML = `<div class="number">${number}</div>
        <img src="${productsCart.images[0]}">
        <div class="description">
            <div class="title">${productsCart.title}</div>
            <p>${productsCart.description}</p>
            <div class="about"><span>Rating: ${productsCart.rating}</span><span>Discount: ${productsCart.discountPercentage}</span></div>
        </div>
        <div class="stock">
            <span>Stock: ${productsCart.stock}</span>
            <div class="buttons"><button>+</button><span>1</span><button>-</button></div>
            <span>&#8364;${productsCart.price}</span>
        </div>`;

        cart.appendChild(wrap);
    }
}
