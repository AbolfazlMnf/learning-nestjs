import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserQueryDto } from '../dto/user-query.dto';
import { UserDto } from '../dto/user.dto';
import type { Request } from 'express';
import { FarsiPipe } from 'src/shared/pipes/farsi.pipe';
import { MobilePipe } from 'src/shared/pipes/mobile.pipe';
import { PasswordPipe } from 'src/shared/pipes/password.pipe';
import { PasswordInterceptor } from 'src/shared/interceptors/password.interceptor';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() queryParams: UserQueryDto) {
    return this.userService.findAll(queryParams);
  }
  @Post()
  @UseInterceptors(PasswordInterceptor)
  createBlog(@Body(FarsiPipe, MobilePipe, PasswordPipe) body: UserDto) {
    return this.userService.create(body);
  }

  @Get(`:id`)
  getOneBlog(@Param(`id`) id: string) {
    return this.userService.findOne(id);
  }
  @Put(`:id`)
  updateBlog(@Param(`id`) id: string, @Body() body: UserDto) {
    return this.userService.update(id, body);
  }

  @Delete(`:id`)
  deleteBlog(@Param(`id`) id: string) {
    return this.userService.delete(id);
  }
}
