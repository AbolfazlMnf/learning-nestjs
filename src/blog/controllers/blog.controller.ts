import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

import { generalQueryDto } from 'src/shared/dtos/query-dto';
import { BlogService } from '../services/blog.service';
import { BlogDtos } from '../dtos/blog.dtos';
import { User } from 'src/shared/decorators/user.decorator';
import { JwtGuard } from 'src/shared/guards/jwt.guard';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { Role } from 'src/user/schemas/user.shema';

@ApiTags('Blogs')
// @ApiHeader({
//   name: 'apikey',
//   description: 'API KEY',
// })
@Controller('blogs')
@UseGuards(JwtGuard, new RoleGuard([Role.Admin, Role.CopyRighter]))
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
  createBlog(@Body() body: BlogDtos, @User() user: string) {
    console.log(user);
    return this.blogService.create(body, user);
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
