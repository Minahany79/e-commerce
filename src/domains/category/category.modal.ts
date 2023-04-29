import { Model, Schema, model } from "mongoose";
import { ICategory } from "./models/category.interface";


class Category<T extends ICategory> {
    public readonly categoryModel: Model<T>;

    constructor() {
        const schema = new Schema<T>({
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true,
            }
        }, {
            timestamps: true
        });

        this.categoryModel = model<T>('Category', schema);
    }
}
export const CategoryModel = new Category().categoryModel;

