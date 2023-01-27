import data from '../assets/data/products.json';

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export class ProductModel {
    public getAll(): Product[] {
        return data.products;
    }

    public getItemById(id: number): Product | undefined {
        return data.products.find((element) => element.id === id);
    }
}
