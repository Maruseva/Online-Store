import { Card } from '../../components/card/card.view';
import { ProductDetailsController } from './pageProductDetails.controller';
import './pageProductDetails.style.css';

export class ProductDetails {
    private readonly id: string;
    private controller: ProductDetailsController;
    constructor(id: string) {
        this.id = id;
        this.controller = new ProductDetailsController();
    }

    public render(): void {
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

        const product = this.controller.getItemById(1);
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

            const card = new Card('descriptionsWrap');
            card.renderCard('Description:', `<div class="description">${product.description}</div>`);
            card.renderCard(
                'Discount Percentage:',
                `<div class="description">${product.discountPercentage.toString()}</div>`
            );
            card.renderCard('Rating:', `<div class="description">${product.rating.toString()}</div>`);
            card.renderCard('Stock:', `<div class="description">${product.stock.toString()}</div>`);
            card.renderCard('Brand:', `<div class="description">${product.brand}</div>`);
            card.renderCard('Category:', `<div class="description">${product.category}</div>`);

            priceWrap.innerHTML = `<span>&#8364;${product.price}</span>
        <button>ADD TO CART</button>
        <button>BUY NOW</button>`;

            imagesWrap.addEventListener('click', (event) => {
                const src = (event.target as HTMLImageElement).getAttribute('src');
                if (src) {
                    bigImage.setAttribute('src', src);
                }
            });
        }
    }
}
