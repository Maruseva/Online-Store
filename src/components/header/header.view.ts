import template from './header.template.html';
import './header.style.css';

export class HeaderView {
    private id: string;
    constructor(id: string) {
        this.id = id;
    }
    public render(): void {
        const body = <HTMLBodyElement>document.getElementById(this.id);
        const header = <HTMLElement>document.createElement('header');
        header.innerHTML = template;
        body.appendChild(header);
    }
}
