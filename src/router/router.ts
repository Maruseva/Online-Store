import { Catalog } from '../pages/catalog/catalog.view';
import { PageNotFound } from '../pages/pageNotFound /pageNotFound';
import { ProductDetails } from '../pages/pageProductDetails/pageProductDetails.view';
import { getPathname } from '../utils/url';
import { HeaderView } from '../components/header/header.view';
import { Footer } from '../components/footer/footer.view';

export class Router {
    private readonly id: string;
    private catalog: Catalog;
    private pageNotFound: PageNotFound;
    private details: ProductDetails;
    private header: HeaderView;
    private footer: Footer;
    constructor(id: string) {
        this.id = id;
        this.header = new HeaderView(this.id);
        this.catalog = new Catalog(this.id);
        this.details = new ProductDetails(this.id);
        this.pageNotFound = new PageNotFound(this.id);
        this.footer = new Footer(this.id);
    }
    render() {
        this.header.render();

        const url = window.location.href;
        const pathname = getPathname(url);

        if (pathname === '/') {
            this.catalog.render();
        }

        if (pathname.includes('product-details')) {
            const index = pathname.lastIndexOf('/');
            const numberProduct = parseInt(pathname.slice(index + 1));
            this.details.render(numberProduct);
        }

        if (pathname === 'cart') {
            // пока нет
        }

        if (pathname === '404') {
            this.pageNotFound.render();
        }

        this.footer.render();
    }

    run() {
        this.render();

        const renderPage = () => {
            const url = window.location.href;
            const pathname = getPathname(url);
            console.log(pathname);
            if (pathname === '/') {
                this.catalog.clearCatalog();
                this.catalog.renderCatalog();
            } else {
                console.log(pathname);
                this.render();
            }
        };

        window.addEventListener('pushstate', renderPage);
        window.addEventListener('popstate', renderPage);
    }
}
