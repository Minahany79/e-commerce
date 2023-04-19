import { Router } from 'express';
import { IRouterBase } from '../../shared/abstractions/router-base';
import { BlogController } from './blog.controller';

class BlogRouter implements IRouterBase<BlogController>  {

    router: Router;
    controller: BlogController;

    constructor() {
        this.router = Router();
        this.controller = new BlogController();
        this.addRoutes();
    }

    getRouter(): Router {
        return this.router;
    }

    addRoutes(): void {
        // add routes here
    }

}

export const blogRoutes: Router = new BlogRouter().getRouter();
