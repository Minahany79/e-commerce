import { BlogService } from './blog.service';

export class BlogController {
    private readonly blogService: BlogService;
  
    constructor() {
        this.blogService = new BlogService();
    }
}

