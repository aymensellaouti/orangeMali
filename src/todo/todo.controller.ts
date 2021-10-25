import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { TodoModel, TodoStatusEnum } from './Model/todo.model';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AddTodoDto } from "./dto/add-todo.dto";

@Controller('todo')
export class TodoController {
  todos: TodoModel[] = [
    // new TodoModel(
    //   1,
    //   'first todo',
    //   'first todo description',
    //   new Date(),
    //   TodoStatusEnum.waiting,
    // ),
    // new TodoModel(
    //   2,
    //   'second todo',
    //   'second todo description',
    //   new Date(),
    //   TodoStatusEnum.done,
    // ),
  ];
  @Get('')
  getTodos(@Req() request: Request): TodoModel[] {
    console.log(request);
    return this.todos;
  }
  // @Get('/:var')
  // getVar(): string {
  //   return 'cc';
  // }
  @Post()
  // @HttpCode(200)
  addTodo(@Body() todoInfos: AddTodoDto): TodoModel {
    const { name, description } = todoInfos;
    const newTodo = new TodoModel();
    newTodo.id = uuidv4();
    newTodo.name = name;
    newTodo.description = description;
    this.todos.push(newTodo);
    return newTodo;
  }
  @Get('/testParam/:id?/:name?')
  // @HttpCode(200)
  testParam(@Param() params): any {
    return params;
  }
  @Get(':id')
  getTodoById(@Param('id') id: string): TodoModel {
    return this.findTodoById(id);
  }
  @Put(':id')
  updateTodoById(
    @Param('id') id: string,
    @Body() updateTodoData: Partial<TodoModel>,
  ): TodoModel {
    const todo = this.findTodoById(id);
    const { name, description, status } = updateTodoData;
    todo.name = name ?? todo.name;
    todo.description = description ?? todo.description;
    todo.status = status ?? todo.status;
    return todo;
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: string): { count: number } {
    const index = this.todos.findIndex((actualTodo) => actualTodo?.id === id);
    if (index === -1) {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
    this.todos.splice(index, 1);
    return { count: 1 };
  }

  findTodoById(id: string): TodoModel {
    const todo = this.todos.find((actualTodo) => actualTodo?.id === id);
    if (!todo) {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
    return todo;
  }
}
