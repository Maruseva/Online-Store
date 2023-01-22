import { App } from './components/app/app';

const app = new App('root');
app.run();

window.addEventListener('pushstate', () => {
    app.run();
});
