import './card.style.css';

export class Card {
    private readonly id: string;
    constructor(id: string) {
        this.id = id;
    }
    public render(title: string, content: string = '', imgUrl: string): void {
        const container = <HTMLElement>document.getElementById(this.id);
        const item = <HTMLDivElement>document.createElement('div');
        const itemTitle = <HTMLHeadingElement>document.createElement('h3');
        const itemContent = <HTMLDivElement>document.createElement('div');
        item.className = 'card_item';
        itemContent.className = 'card_itemContent';
        item.style.backgroundImage = `url(${imgUrl})`;
        itemTitle.innerText = title;
        itemContent.innerHTML = content;
        item.appendChild(itemTitle);
        item.appendChild(itemContent);
        container.appendChild(item);
    }
}
