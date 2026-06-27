import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional } from 'class-validator';

export class uploadFileDto {
  @ApiProperty({
    type: `string`,
    format: `binary`,
    required: true,
  })
  @Allow()
  file: any;

  @IsOptional()
  @ApiProperty()
  folder?: string;

  @IsOptional()
  @ApiProperty()
  width?: string;

  @IsOptional()
  @ApiProperty()
  height?: string;
}
