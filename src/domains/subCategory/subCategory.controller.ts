import { SubCategoryService } from './subCategory.service';

export class SubCategoryController {
    private readonly subCategoryService: SubCategoryService;
  
    constructor() {
        this.subCategoryService = new SubCategoryService();
    }
}

