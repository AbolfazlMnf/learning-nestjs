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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserQueryDto } from '../dto/user-query.dto';
import { UserDto } from '../dto/user.dto';
import type { Request } from 'express';
import { FarsiPipe } from 'src/shared/pipes/farsi.pipe';
import { MobilePipe } from 'src/shared/pipes/mobile.pipe';
import { PasswordPipe } from 'src/shared/pipes/password.pipe';
import { PasswordInterceptor } from 'src/shared/interceptors/password.interceptor';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtGuard } from 'src/shared/guards/jwt.guard';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { Role } from '../schemas/user.shema';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtGuard, new RoleGuard([Role.Admin]))
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() queryParams: UserQueryDto) {
    return this.userService.findAll(queryParams);
  }
  @Post()
  @UseInterceptors(PasswordInterceptor)
  createUser(
    @Body(FarsiPipe, MobilePipe, new PasswordPipe(true)) body: UserDto,
  ) {
    return this.userService.create(body);
  }

  @Get(`:id`)
  getOneUser(@Param(`id`) id: string) {
    return this.userService.findOne(id);
  }
  @Patch(`:id`)
  updateUser(
    @Param(`id`) id: string,
    @Body(FarsiPipe, MobilePipe, new PasswordPipe(true)) body: UpdateUserDto,
  ) {
    return this.userService.update(id, body);
  }

  @Delete(`:id`)
  deleteUSer(@Param(`id`) id: string) {
    return this.userService.delete(id);
  }
}
