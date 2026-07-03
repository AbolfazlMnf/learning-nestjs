import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  mobile!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code!: string;
}
