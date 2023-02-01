import { CatalogController } from '../../controller/catalog.controller';
import { Product } from '../../model/product.model';
import { Card } from '../card/card.view';
import './productCard.style.css';

export class ProductCard extends Card {
    private controller: CatalogController;
    constructor(id: string) {
        super(id);
        this.controller = new CatalogController();
    }

    public renderBigCard(description: Product): void {
        let text = 'ADD TO CART';
        const cartProducts = this.controller.getProducts();
        const result = cartProducts.find((element) => element.id === description.id);

        if (result) {
            text = 'DROP FROM CART';
        }

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
                    <button class="add_to_cart">${text}</button>
                    <button>DETAILS</button>
                </div>
            </div>
            <img src="${description.images[0]}" alt="">
        </div>`;
        super.renderCard(description.title, content, description.id.toString());
    }

    public renderSmallCard({ title, id, images }: Product): void {
        const content: string = `<div class="card_itemContent_small">
            <div class="card_button">
                <button class="add_to_cart">ADD TO CART</button>
                <button>DETAILS</button>
            </div>
            <img src="${images[0]}" alt="">
        </div>`;
        super.renderCard(title, content, id.toString());
    }
}
