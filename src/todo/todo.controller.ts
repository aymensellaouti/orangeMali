import { Controller, Get } from "@nestjs/common";
import { TodoModel, TodoStatusEnum } from './Model/todo.model';

@Controller('todo')
export class TodoController {
  todos: TodoModel[] = [
    new TodoModel(
      1,
      'first todo',
      'first todo description',
      new Date(),
      TodoStatusEnum.waiting,
    ),
    new TodoModel(
      2,
      'second todo',
      'second todo description',
      new Date(),
      TodoStatusEnum.done,
    ),
  ];
  @Get('')
  getTodos(): TodoModel[] {
    return this.todos;
  }
}
