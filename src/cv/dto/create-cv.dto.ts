import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Type } from 'class-transformer';

export class CreateCvDto {
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  name: string;
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  firstname: string;
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  job: string;
  @IsString()
  @IsOptional()
  path: string;
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  cin: string;
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  age: number;
}
