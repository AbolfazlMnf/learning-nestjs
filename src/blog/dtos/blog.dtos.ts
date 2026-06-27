import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BlogDtos {
  @IsString({ message: `title must be string` })
  @IsNotEmpty({ message: `title is required` })
  @ApiProperty()
  title!: string;

  @ApiProperty()
  @IsString()
  content!: string;

  @ApiProperty()
  @IsString()
  image!: string;

  @ApiProperty()
  @IsString()
  category!: string;
}
