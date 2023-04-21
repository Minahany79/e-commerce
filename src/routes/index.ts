import { Router } from "express";
import { categoryRoutes } from "../domains/category/category.routes";

export class ApplicationRouter {
    private baseUrl = process.env.BASE_URL || "/api/v1";
    router: Router;

    constructor() {
        this.router = Router();
    }

    public getRoutes(): Router {
        this.router.use(`${this.baseUrl}/Categories`, categoryRoutes);
        return this.router;
    }
}

export const applicationRoutes: Router = new ApplicationRouter().getRoutes();
