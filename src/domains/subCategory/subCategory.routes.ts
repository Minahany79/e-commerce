import { Request, Response, Router } from 'express';
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
        this.router.post("/", async (req: Request, res: Response) => {
            this.controller.createSubCategory(req, res);
        })

        this.router.get("/:id", async (req: Request, res: Response) => {
            this.controller.getSubCategoryById(req, res);
        })

        this.router.get("/", async (req: Request, res: Response) => {
            this.controller.getAllSubCategories(req, res);
        })

        this.router.delete("/:id", async (req: Request, res: Response) => {
            this.controller.deleteSubCategoryById(req, res);
        })

        this.router.put("/:id", async (req: Request, res: Response) => {
            this.controller.updateSubCategoryById(req, res);
        })
    }
}

export const subCategoryRoutes: Router = new SubCategoryRouter().getRouter();
