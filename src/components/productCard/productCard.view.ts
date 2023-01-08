import { Product } from '../../model/product.model';
import { Card } from '../card/card.view';
import './productCard.style.css';

export class ProductCard extends Card {
    public render(description: Product): void {
        const content: string = `<div class="card_description">
        <span>Category: </span>${description.category}<br>
        <span>Brand: </span>${description.brand}<br>
        <span>Price: </span>${description.price}<br>
        <span>Discount: </span>${description.discountPercentage}<br>
        <span>Rating: </span>${description.rating}<br>
        <span>Stock: </span>${description.stock}<br>
    </div>
    <div class="card_button">
        <button>ADD TO CART</button>
        <button>DETAILS</button>
    </div>`;
        super.renderCard(description.title, content, description.images[0]);
    }
}
