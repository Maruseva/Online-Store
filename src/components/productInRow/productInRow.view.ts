import { ProductWithCount } from '../../pages/cart/cart.view';
import './productInRow.style.css';

export class ProductInRow {
    private readonly id: string;
    constructor(id: string) {
        this.id = id;
    }

    render(productsCart: ProductWithCount, number: number): void {
        const cart = <HTMLDivElement>document.getElementById(this.id);
        const wrap = <HTMLDivElement>document.createElement('div');
        wrap.className = 'wrap';
        wrap.setAttribute('data-id', `${productsCart.id}`);

        wrap.innerHTML = `<div class="number">${number}</div>
        <img src="${productsCart.images[0]}">
        <div class="description">
            <div class="productInRow__title">${productsCart.title}</div>
            <p>${productsCart.description}</p>
            <div class="about"><span>Rating: ${productsCart.rating}</span><span>Discount: ${productsCart.discountPercentage}</span></div>
        </div>
        <div class="stock">
            <span>Stock: ${productsCart.stock}</span>
            <div class="buttons"><button class="add_to_cart">+</button><span data-count="${productsCart.count}">${productsCart.count}</span><button class="drop_from_cart">-</button></div>
            <span class="productInRow__price">&#8364;${productsCart.price}</span>
        </div>`;

        cart.appendChild(wrap);
    }
}
