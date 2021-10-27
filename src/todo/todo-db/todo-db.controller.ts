import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { TodoModel } from '../Model/todo.model';
import { TodoService } from '../todo.service';
import { ConfigService } from '@nestjs/config';
import { FirstPipePipe } from '../../pipes/first-pipe.pipe';
import { AddTodoDto } from '../dto/add-todo.dto';
import { TodoEntity } from '../entities/todo.entity';
import { UpdateTodoDto } from "../dto/update-todo.dto";

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
  @Put(':id')
  updateTodoById(
    @Param('id') id: number,
    @Body() updateTodoData: UpdateTodoDto,
  ): Promise<TodoEntity> {
    return this.todoService.updateDbTodoById(id, updateTodoData);
  }
}
