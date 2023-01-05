import template from './footer.template.html';
import './footer.style.css';

export class Footer {
    private readonly id: string;
    constructor(id: string) {
        this.id = id;
    }
    public render(): void {
        const body = <HTMLElement>document.getElementById(this.id);
        const footer = <HTMLElement>document.createElement('footer');
        footer.innerHTML = template;
        body.appendChild(footer);
    }
}
