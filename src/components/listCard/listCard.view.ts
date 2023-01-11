import { Card } from '../card/card.view';
import './listCard.style.css';

export interface Options {
    category: string;
    totalQuantity: number;
    displayQuantity: number;
}

export class ListCard extends Card {
    public render(title: string, options: Options[]): void {
        let content: string = '<div>';

        options.forEach((element) => {
            content += `<div class="options">
            <label>
            <input type="checkbox" name=${title} value=${element.category}>
            ${element.category}
            </label>
            <span>(${element.displayQuantity}/${element.totalQuantity})</span>
            </div>`;
        });

        content += '</div>';

        super.renderCard(title, content, '');
    }
}
