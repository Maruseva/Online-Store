import { Catalog } from '../pages/catalog/catalog.view';
import { PageNotFound } from '../pages/pageNotFound /pageNotFound';
import { ProductDetails } from '../pages/pageProductDetails/pageProductDetails.view';
import { getPathname } from '../utils/url';
import { HeaderView } from '../components/header/header.view';
import { Footer } from '../components/footer/footer.view';
import { Cart } from '../pages/cart/cart.view';

export class Router {
    private readonly id: string;
    private catalog: Catalog;
    private pageNotFound: PageNotFound;
    private details: ProductDetails;
    private header: HeaderView;
    private footer: Footer;
    private cart: Cart;
    constructor(id: string) {
        this.id = id;
        this.header = new HeaderView(this.id);
        this.catalog = new Catalog(this.id);
        this.details = new ProductDetails(this.id);
        this.pageNotFound = new PageNotFound(this.id);
        this.footer = new Footer(this.id);
        this.cart = new Cart(this.id);
    }
    render(): void {
        this.header.render();

        const url = window.location.href;
        const pathname = getPathname(url);
        const value = pathname.split('/');

        if (value[1] === '') {
            this.catalog.render();
        } else if (value[1] === 'product-details') {
            const numberProduct = parseInt(value[2]);
            this.details.render(numberProduct);
        } else if (value[1] === 'cart') {
            this.cart.render([]);
        } else {
            this.pageNotFound.render();
        }

        this.footer.render();
    }

    run(): void {
        this.render();

        const renderPage = () => {
            const url = window.location.href;
            const pathname = getPathname(url);
            if (pathname === '/' && this.catalog.state === true) {
                this.catalog.clearCatalog();
                this.catalog.renderCatalog();
            } else {
                this.clear();
                this.render();
            }
        };

        window.addEventListener('pushstate', renderPage);
        window.addEventListener('popstate', renderPage);
    }

    clear(): void {
        const body = <HTMLBodyElement>document.getElementById(this.id);
        body.innerHTML = '';
        this.catalog.state = false;
    }
}
