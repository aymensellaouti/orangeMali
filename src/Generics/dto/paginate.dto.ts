import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginateDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  pageNumber: number;
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  pageSize: number;
}
