import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { TodoModel } from '../Model/todo.model';
import { TodoService } from '../todo.service';
import { ConfigService } from '@nestjs/config';
import { FirstPipePipe } from '../../pipes/first-pipe.pipe';
import { AddTodoDto } from '../dto/add-todo.dto';
import { TodoEntity } from '../entities/todo.entity';
import { UpdateTodoDto } from "../dto/update-todo.dto";
import { DeleteResult } from "typeorm";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";

@Controller({
  path: 'todo',
  version: '2',
})
export class TodoDbController {
  constructor(private todoService: TodoService) {}
  @Get('')
  getTodos(@Query() searchCritrias): Promise<TodoEntity[]> {
    console.log('sc :', searchCritrias);
    return this.todoService.findAllTodoDb();
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
  @Delete(':id')
  async deleteTodo(@Param('id') id: number): Promise<UpdateResult> {
    return this.todoService.softDeleteDbTodo(id);
  }
  @Patch('/restore/:id')
  async restoreTodo(@Param('id') id: number): Promise<UpdateResult> {
    return this.todoService.restoreSoftDeletedDbTodo(id);
  }
}
