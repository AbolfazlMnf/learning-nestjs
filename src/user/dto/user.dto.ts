import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../schemas/user.shema';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  mobile!: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(Role)
  role!: Role;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password!: string;
}
