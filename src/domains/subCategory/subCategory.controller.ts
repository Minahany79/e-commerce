import { Request, Response } from 'express';
import { StatusCodes } from '../../shared/enums/status-codes';
import { ResponseHandlingService } from '../../shared/services/response-handling.service';
import { SubCategoryService } from './subCategory.service';
import { ErrorResponse } from '../../shared/models/error-response';
import { MessageResponse } from '../../shared/models/message-response';
import { CategoryService } from '../category/category.service';

export class SubCategoryController {
    private readonly subCategoryService: SubCategoryService;
    private readonly categoryService: CategoryService;

    constructor() {
        this.subCategoryService = new SubCategoryService();
        this.categoryService = new CategoryService();
    }

    public async createSubCategory(req: Request, res: Response) {
        const { name, category } = req.body;
        const categoryInDb = await this.categoryService.findById(category);
        if (!categoryInDb) {
            throw new ErrorResponse("Cannot find a category", StatusCodes.NotFound);
        }
        const newSubCategory = await this.subCategoryService.create({ name, category });
        return new ResponseHandlingService(res, newSubCategory, StatusCodes.Created);
    }

    public async getSubCategoryById(req: Request, res: Response) {
        const { id } = req.params;
        const subcategoryInDb = await this.subCategoryService.findById(id);
        if (!subcategoryInDb) {
            throw new ErrorResponse("Cannot find a SubCategory", StatusCodes.NotFound);
        }
        return new ResponseHandlingService(res, subcategoryInDb, StatusCodes.OK);
    }

    public async getAllSubCategories(req: Request, res: Response) {
        const subCategoriesInDb = await this.subCategoryService.findAll();
        return new ResponseHandlingService(res, subCategoriesInDb, StatusCodes.OK);

    }

    public async deleteSubCategoryById(req: Request, res: Response) {
        const { id } = req.params;
        await this.subCategoryService.delete(id);
        return new ResponseHandlingService(res, new MessageResponse("Deleted SubCategory successfully"), StatusCodes.NoContent);
    }

    public async updateSubCategoryById(req: Request, res: Response) {
        const { id } = req.params;
        const { name, category } = req.body;
        const updatedSubCategory = await this.subCategoryService.update(id, { name, category });
        return new ResponseHandlingService(res, updatedSubCategory, StatusCodes.OK);
    }
}

