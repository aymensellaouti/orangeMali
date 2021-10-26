import { IsEnum, IsOptional } from 'class-validator';
import { TodoStatusEnum } from '../Model/todo.model';
import { PartialType } from '@nestjs/mapped-types';
import { AddTodoDto } from './add-todo.dto';
export class UpdateTodoDto extends PartialType(AddTodoDto) {
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
}
