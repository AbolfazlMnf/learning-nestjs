import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class blogCategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title!: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  content?: string;
}
