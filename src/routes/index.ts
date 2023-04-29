import { Router } from "express";
import { categoryRoutes } from "../domains/category/category.routes";
import { subCategoryRoutes } from "../domains/subCategory/subCategory.routes";

export class ApplicationRouter {
    private baseUrl = process.env.BASE_URL || "/api/v1";
    router: Router;

    constructor() {
        this.router = Router();
    }

    public getRoutes(): Router {
        this.router.use(`${this.baseUrl}/Categories`, categoryRoutes);
        this.router.use(`${this.baseUrl}/SubCategories`, subCategoryRoutes);
        return this.router;
    }
}

export const applicationRoutes: Router = new ApplicationRouter().getRoutes();
