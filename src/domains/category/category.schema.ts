import { Schema, model } from "mongoose";
import { ICategory } from "./models/category.interface";


class Category<T extends ICategory> {
    public readonly CategoryModel: any;

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

        this.CategoryModel = model<T>('Category', schema);
    }
}
export const CategoryModel = new Category().CategoryModel;

