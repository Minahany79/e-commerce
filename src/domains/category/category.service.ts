import { Model } from 'mongoose';
import { ICategory } from './models/category.interface';
import { CategoryModel } from "./category.schema";


export class CategoryService<T extends ICategory> {
    private readonly categoryModel: Model<T>;

    constructor() {
        this.categoryModel = CategoryModel;
    }

    async create(category: T): Promise<T> {
        const newCategory = new this.categoryModel(category);
        return await newCategory.save();
    }

    async findById(id: string): Promise<T | null> {
        return await this.categoryModel.findById(id);
    }

    async findAll(): Promise<T[]> {
        return await this.categoryModel.find({});
    }

    async update(id: string, category: Partial<T>): Promise<T> {
        const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, category, { new: true });
        if (!updatedCategory) throw new Error('Category not found');
        return updatedCategory;
    }

    async delete(id: string): Promise<void> {
        const deletedCategory = await this.categoryModel.findByIdAndDelete(id);
        if (!deletedCategory) throw new Error('Category not found');
    }
}
