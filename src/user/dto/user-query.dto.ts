import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { generalQueryDto } from 'src/shared/dtos/query-dto';

export class UserQueryDto extends generalQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  lastName?: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  mobile?: string;
}
