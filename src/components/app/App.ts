import { Footer } from '../footer/footer.view';
import { HeaderView } from '../header/header.view';
import { ProductCard } from '../productCard/productCard.view';

const a = {
    id: 1,
    title: 'iPhone 9',
    description: 'An apple mobile which is nothing like apple',
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: 'Apple',
    category: 'smartphones',
    thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    images: [
        'https://i.dummyjson.com/data/products/1/1.jpg',
        'https://i.dummyjson.com/data/products/1/2.jpg',
        'https://i.dummyjson.com/data/products/1/3.jpg',
        'https://i.dummyjson.com/data/products/1/4.jpg',
        'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    ],
};

export class App {
    private readonly id: string;
    constructor(id: string) {
        this.id = id;
    }
    public run(): void {
        const header = new HeaderView(this.id);
        header.render();

        const pr = new ProductCard(this.id);
        pr.render(a);

        const footer = new Footer(this.id);
        footer.render();
    }
}
