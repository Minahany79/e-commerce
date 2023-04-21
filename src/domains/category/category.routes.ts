import { Request, Response, Router } from 'express';
import { IRouterBase } from '../../shared/abstractions/router-base';
import { CategoryController } from './category.controller';

class CategoryRouter implements IRouterBase<CategoryController>  {

    router: Router;
    controller: CategoryController;

    constructor() {
        this.router = Router();
        this.controller = new CategoryController();
        this.addRoutes();
    }

    getRouter(): Router {
        return this.router;
    }

    addRoutes(): void {
        this.router.post("/", async (req: Request, res: Response) => {
            this.controller.createCategory(req, res);
        })

        this.router.get("/:id", async (req: Request, res: Response) => {
            this.controller.getCategoryById(req, res);
        })

        this.router.get("/", async (req: Request, res: Response) => {
            this.controller.getAllCategories(req, res);
        })

        this.router.delete("/:id", async (req: Request, res: Response) => {
            this.controller.deleteCategoryById(req, res);
        })

        this.router.put("/:id", async (req: Request, res: Response) => {
            this.controller.updateCategoryById(req, res);
        })
    }

}

export const categoryRoutes: Router = new CategoryRouter().getRouter();
