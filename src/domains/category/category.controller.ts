import { Request, Response } from 'express';
import { CategoryService } from './category.service';
import { ResponseHandlingService } from '../../shared/services/response-handling.service';
import { ErrorResponse } from '../../shared/models/error-response';
import { StatusCodes } from '../../shared/enums/status-codes';
import { MessageResponse } from '../../shared/models/message-response';

export class CategoryController {
    private readonly categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    public async createCategory(req: Request, res: Response) {
        const { name, description } = req.body;
        const newCategory = await this.categoryService.create({ name, description });
        return new ResponseHandlingService(res, newCategory, StatusCodes.Created);
    }

    public async getCategoryById(req: Request, res: Response) {
        const { id } = req.params;
        const categoryInDb = await this.categoryService.findById(id);
        if (!categoryInDb) {
            return new ResponseHandlingService(
                res,
                new ErrorResponse(`Can not find a category`, StatusCodes.NotFound),
                StatusCodes.NotFound,
            );
        }
        return new ResponseHandlingService(res, categoryInDb, StatusCodes.OK);
    }

    public async getAllCategories(req: Request, res: Response) {
        const categoriesInDb = await this.categoryService.findAll();
        return new ResponseHandlingService(res, categoriesInDb, StatusCodes.OK);

    }

    public async deleteCategoryById(req: Request, res: Response) {
        const { id } = req.params;
        await this.categoryService.delete(id);
        return new ResponseHandlingService(res, new MessageResponse("Deleted category successfully"), StatusCodes.NoContent);
    }

    public async updateCategoryById(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedCategory = await this.categoryService.update(id, { name, description });
        return new ResponseHandlingService(res, updatedCategory, StatusCodes.OK);
    }
}

