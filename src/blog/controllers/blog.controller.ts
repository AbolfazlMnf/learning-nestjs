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
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

import { generalQueryDto } from 'src/shared/dtos/query-dto';
import { BlogService } from '../services/blog.service';
import { BlogDtos } from '../dtos/blog.dtos';

@ApiTags('Blogs')
// @ApiHeader({
//   name: 'apikey',
//   description: 'API KEY',
// })
@Controller('blogs')
@ApiBearerAuth()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  findAll(@Query() queryParams: generalQueryDto) {
    console.log('Controller');
    console.log(queryParams);

    return this.blogService.findAll(queryParams);
  }
  @Post()
  createBlog(@Body() body: BlogDtos) {
    console.log(body);
    return this.blogService.create(body);
  }

  @Get(`:id`)
  getOneBlog(@Param(`id`) id: string) {
    return this.blogService.findOne(id);
  }
  @Put(`:id`)
  updateBlog(@Param(`id`) id: string, @Body() body: BlogDtos) {
    console.log(id);
    console.log(body);
    return this.blogService.update(id, body);
  }

  @Delete(`:id`)
  deleteBlog(@Param(`id`) id: string) {
    console.log(id);
    return this.blogService.delete(id);
  }
}
