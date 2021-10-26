import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ErrorMessages } from '../Generics/error-messages';

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
}
