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
        page.innerHTML = template;
        body.appendChild(page);
    }
}
