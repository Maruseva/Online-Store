import { Product } from '../../model/product.model';
import { Card } from '../card/card.view';

export class ListCard extends Card {
    public render(title: string, products: Product[]): void {
        const options: string[] = [];
        let content: string = '<form>';

        products.forEach((el) => {
            for (let i = 0; options.length < i; i++) {
                if (el[title] === options[i]) {
                    break;
                } else {
                    options.push(el[title]);
                }
            }
        });

        console.log(options);

        options.forEach((element) => {
            content += `<label>
            <input type="checkbox" name=${title} value=${element}>
            ${element}
            </label>
            <br>`;
        });

        content += '</form>';

        super.renderCard(title, content);
    }
}
