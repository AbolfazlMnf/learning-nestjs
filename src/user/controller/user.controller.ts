import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { UpdateUserDto } from '../dto/update-user.dto';

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
  createUser(@Body(FarsiPipe, MobilePipe, PasswordPipe) body: UserDto) {
    return this.userService.create(body);
  }

  @Get(`:id`)
  getOneUser(@Param(`id`) id: string) {
    return this.userService.findOne(id);
  }
  @Patch(`:id`)
  updateUser(
    @Param(`id`) id: string,
    @Body(FarsiPipe, MobilePipe, PasswordPipe) body: UpdateUserDto,
  ) {
    return this.userService.update(id, body);
  }

  @Delete(`:id`)
  deleteUSer(@Param(`id`) id: string) {
    return this.userService.delete(id);
  }
}
