import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResendDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  mobile!: string;
}
