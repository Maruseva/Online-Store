import { Card } from '../../components/card/card.view';
import { CatalogController } from '../../controller/catalog.controller';
import './pageProductDetails.style.css';

export class ProductDetails {
    private readonly id: string;
    private card: Card;
    private controller: CatalogController;
    constructor(id: string) {
        this.id = id;
        this.controller = new CatalogController();
        this.card = new Card('descriptionsWrap');
    }

    public render(productId: number): void {
        const body = <HTMLBodyElement>document.getElementById(this.id);
        const main = <HTMLElement>document.createElement('div');
        const breadcrumbs = <HTMLDivElement>document.createElement('div');
        const item = <HTMLDivElement>document.createElement('div');
        const title = <HTMLDivElement>document.createElement('div');
        const itemWrap = <HTMLDivElement>document.createElement('div');
        const imagesWrap = <HTMLDivElement>document.createElement('div');
        const bigImage = <HTMLImageElement>document.createElement('img');
        const descriptionsWrap = <HTMLDivElement>document.createElement('div');
        const priceWrap = <HTMLDivElement>document.createElement('div');
        main.className = 'main';
        breadcrumbs.className = 'breadcrumbs';
        item.className = 'item';
        title.className = 'title';
        itemWrap.className = 'itemWrap';
        imagesWrap.className = 'imagesWrap';
        bigImage.className = 'bigImage';
        priceWrap.className = 'priceWrap';
        descriptionsWrap.id = 'descriptionsWrap';
        itemWrap.appendChild(imagesWrap);
        itemWrap.appendChild(bigImage);
        itemWrap.appendChild(descriptionsWrap);
        itemWrap.appendChild(priceWrap);
        item.appendChild(title);
        item.appendChild(itemWrap);
        main.appendChild(breadcrumbs);
        main.appendChild(item);
        body.appendChild(main);

        const product = this.controller.getItemById(productId);
        if (product) {
            breadcrumbs.innerHTML = `STORE <span>>></span> 
        ${product.category.toLocaleUpperCase()} <span>>></span>
        ${product.brand.toLocaleUpperCase()} <span>>></span>
        ${product.title.toLocaleUpperCase()}`;

            title.innerHTML = product.title;

            product.images.forEach((element) => {
                const img = <HTMLImageElement>document.createElement('img');
                img.setAttribute('src', element);
                imagesWrap.appendChild(img);
            });

            bigImage.setAttribute('src', product.images[0]);

            this.card.renderCard('Description:', `<div class="description">${product.description}</div>`);
            this.card.renderCard(
                'Discount Percentage:',
                `<div class="description">${product.discountPercentage.toString()}</div>`
            );
            this.card.renderCard('Rating:', `<div class="description">${product.rating.toString()}</div>`);
            this.card.renderCard('Stock:', `<div class="description">${product.stock.toString()}</div>`);
            this.card.renderCard('Brand:', `<div class="description">${product.brand}</div>`);
            this.card.renderCard('Category:', `<div class="description">${product.category}</div>`);

            let text = 'ADD TO CART';
            const cartProducts = this.controller.getProducts();
            const result = cartProducts.find((element) => element.id === product.id);

            if (result) {
                text = 'DROP FROM CART';
            }

            priceWrap.innerHTML = `<span>&#8364;${product.price}</span>
        <button class="add_delete">${text}</button>
        <button>BUY NOW</button>`;

            imagesWrap.addEventListener('click', (event) => {
                const src = (event.target as HTMLImageElement).getAttribute('src');
                if (src) {
                    bigImage.setAttribute('src', src);
                }
            });

            const addDeleteButton = <HTMLButtonElement>document.querySelector('button[class="add_delete"]');
            addDeleteButton.addEventListener('click', () => {
                const cartProducts = this.controller.getProducts();
                const result = cartProducts.find((element) => element.id === product.id);
                if (result) {
                    this.controller.delete(productId);
                    addDeleteButton.innerHTML = 'ADD TO CART';
                } else {
                    this.controller.add(product);
                    addDeleteButton.innerHTML = 'DROP FROM CART';
                }
            });
        } else {
            main.innerHTML = `<div class="not-found">Product number
            <span>${productId}</span> not found</div>`;
        }
    }
}
