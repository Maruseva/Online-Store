import { Router } from '../../router/router';

export class App {
    private readonly id: string;
    private router: Router;

    constructor(id: string) {
        this.id = id;
        this.router = new Router(this.id);
    }

    public run(): void {
        this.router.run();
    }
}
