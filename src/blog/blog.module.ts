import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, blogSchema } from './schemas/blog.schema';
import { BlogService } from './services/blog.service';
import { BlogController } from './controllers/blog.controller';
import { BlogCategoryService } from './services/blog-category.service';
import {
  BlogCategory,
  blogCategorySchema,
} from './schemas/blog-category.schema';
import { BlogCategoryController } from './controllers/blog-category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Blog.name,
        schema: blogSchema,
      },
      {
        name: BlogCategory.name,
        schema: blogCategorySchema,
      },
    ]),
  ],
  providers: [BlogService, BlogCategoryService],
  controllers: [BlogController, BlogCategoryController],
})
export class BlogModule {}
