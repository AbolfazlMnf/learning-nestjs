import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { generalQueryDto } from 'src/shared/dtos/query-dto';
import { BlogCategoryService } from '../services/blog-category.service';
import { blogCategoryDto } from '../dtos/blog-category.dto';

@ApiTags('Category')
@Controller('category')
export class BlogCategoryController {
  constructor(private readonly blogCategoryService: BlogCategoryService) {}

  @Get()
  findAll(@Query() queryParams: generalQueryDto) {
    return this.blogCategoryService.findAll(queryParams);
  }
  @Get(`:id`)
  findOne(@Param(`id`) id: string) {
    return this.blogCategoryService.findOne(id);
  }

  @Post()
  createCategory(@Body() body: blogCategoryDto) {
    return this.blogCategoryService.create(body);
  }

  @Put(':id')
  updateCat(@Param(`id`) id: string, @Body() body: blogCategoryDto) {
    return this.blogCategoryService.update(id, body);
  }

  @Delete(`:id`)
  delete(@Param(`id`) id: string) {
    return this.blogCategoryService.delete(id);
  }
}
