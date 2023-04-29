import { Router } from 'express';
import { IRouterBase } from '../../shared/abstractions/router-base';
import { SubCategoryController } from './subCategory.controller';

class SubCategoryRouter implements IRouterBase<SubCategoryController>  {

    router: Router;
    controller: SubCategoryController;

    constructor() {
        this.router = Router();
        this.controller = new SubCategoryController();
        this.addRoutes();
    }

    getRouter(): Router {
        return this.router;
    }

    addRoutes(): void {
        // add routes here
    }

}

export const subCategoryRoutes: Router = new SubCategoryRouter().getRouter();
