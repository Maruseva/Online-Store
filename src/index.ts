import { App } from './components/app/app';
import { Catalog } from './pages/catalog/catalog.view';

const app = new App('root');
app.run();

const catalog = new Catalog('root');

window.addEventListener('pushstate', () => {
    catalog.clearCatalog();
    catalog.renderCatalog();
});
