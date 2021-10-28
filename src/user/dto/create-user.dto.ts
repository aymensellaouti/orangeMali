import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  username: string;
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  password: string;
}
