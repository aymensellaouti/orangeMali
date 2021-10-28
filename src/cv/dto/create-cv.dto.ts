import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCvDto {
  @IsString()
  @MinLength(2)
  name: string;
  @IsString()
  @MinLength(2)
  firstname: string;
  @IsString()
  @MinLength(2)
  job: string;
  @IsString()
  @IsOptional()
  path: string;
  @IsString()
  @MinLength(2)
  cin: string;
  @Type(() => Number)
  @IsNumber()
  age: number;
}
