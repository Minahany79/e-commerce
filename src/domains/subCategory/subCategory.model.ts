import mongoose, { Model, Schema, model } from 'mongoose';
import { ISubCategory } from './models/subCategory.interface';

class SubCategory<T extends ISubCategory> {
    public readonly subCategoryModel: Model<T>;

    constructor() {
        const schema = new Schema<T>({
            name: {
                type: String,
                required: true,
                unique: true,
            },
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category',
                required: true,
            }
           
        }, {
            timestamps: true
        });

        this.subCategoryModel = model<T>('SubCategory', schema);
    }
}
export const SubCategoryModel = new SubCategory().subCategoryModel;

