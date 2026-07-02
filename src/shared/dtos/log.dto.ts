import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LogType } from '../schemas/log.schema';

export class LogDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url!: string;

  @ApiProperty()
  @IsEnum(LogType)
  type!: LogType;

  @ApiProperty()
  @IsString()
  @IsOptional()
  user?: string;
}
