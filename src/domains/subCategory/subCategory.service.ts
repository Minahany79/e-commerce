import { Model } from 'mongoose';
import { SubCategoryModel } from './subCategory.model';
import { ISubCategory } from './models/subCategory.interface';


export class SubCategoryService {
    private readonly subCategoryModel: Model<ISubCategory>;

    constructor() {
        this.subCategoryModel = SubCategoryModel;
    }

}
