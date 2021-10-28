import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSkillDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  designation: string;
}
