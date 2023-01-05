import logo from '../../assets/img/logo.png';

export class HeaderView {
    public render(): void {
        const body = <HTMLBodyElement>document.getElementById('body');
        const header = <HTMLElement>document.createElement('header');
        const logo = <HTMLImageElement>document.createElement('img');

        logo.appendChild(header);
        header.appendChild(body);
    }
}
