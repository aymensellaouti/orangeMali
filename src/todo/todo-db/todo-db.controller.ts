import { Body, Controller, Get, Post } from "@nestjs/common";
import { TodoModel } from "../Model/todo.model";
import { TodoService } from "../todo.service";
import { ConfigService } from "@nestjs/config";
import { FirstPipePipe } from "../../pipes/first-pipe.pipe";
import { AddTodoDto } from "../dto/add-todo.dto";
import { TodoEntity } from "../entities/todo.entity";

@Controller({
  path: 'todo',
  version: '2',
})
export class TodoDbController {
  constructor(private todoService: TodoService) {}
  @Get('')
  getTodos(): any {
    return 'get todo v2';
    // return this.todoService.getDbTodos();
  }
  @Post()
  // @HttpCode(200)
  addTodo(@Body() todoInfos: AddTodoDto): Promise<TodoEntity> {
    return this.todoService.addDbTodo(todoInfos);
  }
}
