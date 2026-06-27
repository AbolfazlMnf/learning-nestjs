import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsPositive, IsString } from 'class-validator';

export enum Sort {
  Title = `title`,
  CreatedAt = `createdAt`,
  UpdatedAt = `updatedAt`,
}

export class generalQueryDto {
  @IsOptional()
  @IsPositive()
  @ApiPropertyOptional()
  page?: number;
  @IsOptional()
  @IsPositive()
  @ApiPropertyOptional()
  limit?: number;
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string;
  @IsOptional()
  @IsEnum(Sort)
  @ApiPropertyOptional({ enum: Sort })
  sort?: Sort;
}
