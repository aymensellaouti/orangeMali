import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoModel } from './Model/todo.model';
import { AddTodoDto } from './dto/add-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get('')
  getTodos(): TodoModel[] {
    return this.todoService.getTodos();
  }
  @Post()
  // @HttpCode(200)
  addTodo(@Body() todoInfos: AddTodoDto): TodoModel {
    return this.todoService.addTodo(todoInfos);
  }
  @Get('/testParam/:id?/:name?')
  // @HttpCode(200)
  testParam(@Param() params): any {
    return params;
  }
  @Get(':id')
  getTodoById(@Param('id') id: string): TodoModel {
    return this.todoService.getTodoById(id);
  }
  @Put(':id')
  updateTodoById(
    @Param('id') id: string,
    @Body() updateTodoData: Partial<TodoModel>,
  ): TodoModel {
    return this.todoService.updateTodoById(id, updateTodoData);
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: string): { count: number } {
    return this.todoService.deleteTodo(id);
  }
}
