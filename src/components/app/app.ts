import { Footer } from '../footer/footer.view';
import { HeaderView } from '../header/header.view';
import { Catalog } from '../../pages/catalog/catalog.view';

export class App {
    private readonly id: string;
    constructor(id: string) {
        this.id = id;
    }
    public run(): void {
        const header = new HeaderView(this.id);
        header.render();

        const pr = new Catalog(this.id);
        pr.render();

        const footer = new Footer(this.id);
        footer.render();
    }
}
