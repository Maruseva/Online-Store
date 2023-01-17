import { Product } from '../../model/product.model';
import { Card } from '../card/card.view';
import './productCard.style.css';

export class ProductCard extends Card {
    public renderBigCard(description: Product): void {
        const content: string = `<div class="card_itemContent_big">
            <div class="card_itemContent_wrap">
                <div class="card_description">
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
                </div>
            </div>
            <img src="${description.images[0]}" alt="">
        </div>`;
        super.renderCard(description.title, content);
    }

    public renderSmallCard(description: Product): void {
        const content: string = `<div class="card_itemContent_small">
            <div class="card_button">
                <button>ADD TO CART</button>
                <button>DETAILS</button>
            </div>
            <img src="${description.images[0]}" alt="">
        </div>`;
        super.renderCard(description.title, content);
    }
}
