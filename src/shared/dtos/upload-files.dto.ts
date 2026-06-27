import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, IsString } from 'class-validator';

export class UploadFilesDto {
  @ApiProperty({
    type: `array`,
    required: true,
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  @Allow()
  files: any;

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

export class DeleteFileDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    required: true,
  })
  fileName!: string;
  @IsOptional()
  @ApiProperty()
  folder?: string;
}
