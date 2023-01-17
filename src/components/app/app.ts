import { Footer } from '../footer/footer.view';
import { HeaderView } from '../header/header.view';
import { Catalog } from '../../pages/catalog/catalog.view';

export class App {
    private readonly id: string;
    private header: HeaderView;
    private catalog: Catalog;
    private footer: Footer;

    constructor(id: string) {
        this.id = id;
        this.header = new HeaderView(this.id);
        this.catalog = new Catalog(this.id);
        this.footer = new Footer(this.id);
    }

    public run(): void {
        this.header.render();
        this.catalog.render();
        this.footer.render();
    }

    public clear(): void {
        const header = document.getElementsByTagName('header');
        const main = document.getElementsByTagName('main');
        const footer = document.getElementsByTagName('footer');
        header[0].remove();
        main[0].remove();
        footer[0].remove();
    }
}
