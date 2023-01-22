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
        this.catalog.renderFilters();
        this.catalog.renderCatalog();
        this.footer.render();
    }
}
