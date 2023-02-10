import template from './pageNotFound.template.html';
import './pageNotFound.style.css';

export class PageNotFound {
    private readonly id: string;
    constructor(id: string) {
        this.id = id;
    }
    public render(): void {
        const body = <HTMLElement>document.getElementById(this.id);
        const page = <HTMLDivElement>document.createElement('div');
        page.className = 'page_not_found';
        page.innerHTML = template;
        body.appendChild(page);
    }
}
