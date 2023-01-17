import { App } from './components/app/app';
import { Catalog } from './pages/catalog/catalog.view';

const app = new App('root');
app.run();

window.addEventListener('pushstate', () => {
    const clearCatalog = new Catalog('root');
    clearCatalog.clear();

    app.run();
});
