import { Model } from 'mongoose';
import { SubCategoryModel } from './subCategory.model';
import { ISubCategory } from './models/subCategory.interface';
import { ErrorResponse } from '../../shared/models/error-response';
import { StatusCodes } from '../../shared/enums/status-codes';


export class SubCategoryService {
    private readonly subCategoryModel: Model<ISubCategory>;

    constructor() {
        this.subCategoryModel = SubCategoryModel;
    }

    async create(subcategory: ISubCategory): Promise<ISubCategory> {
        const newSubCategory = new this.subCategoryModel(subcategory);
        return await newSubCategory.save();
    }

    async findById(id: string): Promise<ISubCategory | null> {
        return await this.subCategoryModel.findById(id);
    }

    async findAll(): Promise<ISubCategory[]> {
        return await this.subCategoryModel.find({}).populate(['category']);
    }

    async update(id: string, category: Partial<ISubCategory>): Promise<ISubCategory> {
        const updateSubCategory = await this.subCategoryModel.findByIdAndUpdate(id, category, { new: true });
        if (!updateSubCategory) throw new ErrorResponse("SubCategory not found", StatusCodes.NotFound);
        return updateSubCategory;
    }

    async delete(id: string): Promise<void> {
        const deletedSubCategory = await this.subCategoryModel.findByIdAndDelete(id);
        if (!deletedSubCategory) throw new ErrorResponse("SubCategory not found", StatusCodes.NotFound);
    }
}
