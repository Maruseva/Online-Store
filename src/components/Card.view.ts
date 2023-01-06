import './card.style.css';

export class Card {
    public render(title: string): void {
        const item = <HTMLDivElement>document.createElement('div');
        const itemTitle = <HTMLHeadingElement>document.createElement('h3');
        const itemContent = <HTMLDivElement>document.createElement('div');
        item.className = 'card_item';
        itemContent.className = 'card_itemContent';
        itemTitle.innerText = title;
        item.appendChild(itemTitle);
        item.appendChild(itemContent);
    }
}
