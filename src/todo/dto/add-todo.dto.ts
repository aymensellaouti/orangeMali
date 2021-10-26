import { IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";
import { ErrorMessages } from '../Generics/error-messages';
import { Type } from "class-transformer";

export class AddTodoDto {
  @IsNotEmpty({
    message: ErrorMessages.emptyMessage,
  })
  @MinLength(3, {
    message: ErrorMessages.lengthMessage(),
  })
  @MaxLength(10, {
    message: ErrorMessages.lengthMessage(false),
  })
  name: string;
  @IsNotEmpty({
    message: ErrorMessages.emptyMessage,
  })
  @MinLength(10)
  description: string;
  // @IsNumber()
  // @Type(() => Number)
  // @IsNotEmpty()
  // age: number;
}
