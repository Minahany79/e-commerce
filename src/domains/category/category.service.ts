import { Model } from 'mongoose';
import { ICategory } from './models/category.interface';
import { CategoryModel } from "./category.modal";
import { ErrorResponse } from '../../shared/models/error-response';
import { StatusCodes } from '../../shared/enums/status-codes';


export class CategoryService {
    private readonly categoryModel: Model<ICategory>;

    constructor() {
        this.categoryModel = CategoryModel;
    }

    async create(category: ICategory): Promise<ICategory> {
        const newCategory = new this.categoryModel(category);
        return await newCategory.save();
    }

    async findById(id: string): Promise<ICategory | null> {
        return await this.categoryModel.findById(id);
    }

    async findAll(): Promise<ICategory[]> {
        return await this.categoryModel.find({});
    }

    async update(id: string, category: Partial<ICategory>): Promise<ICategory> {
        const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, category, { new: true });
        if (!updatedCategory) throw new ErrorResponse("Category not found", StatusCodes.NotFound);
        return updatedCategory;
    }

    async delete(id: string): Promise<void> {
        const deletedCategory = await this.categoryModel.findByIdAndDelete(id);
        if (!deletedCategory) throw new ErrorResponse("Category not found", StatusCodes.NotFound);
    }
}
