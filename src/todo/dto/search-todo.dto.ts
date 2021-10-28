import { TodoStatusEnum } from '../Model/todo.model';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginateDto } from '../../Generics/dto/paginate.dto';

export class SearchTodoDto extends PaginateDto {
  @IsOptional()
  criteria: string;

  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
}
