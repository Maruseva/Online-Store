import template from './pageNotFound.template.html';
import './pageNotFound.style.css';

export class PageNotFound {
    private readonly id: string;
    constructor(id: string) {
        this.id = id;
    }
    public render(): void {
        const body = <HTMLElement>document.getElementById(this.id);
        body.innerHTML = template;
    }
}
