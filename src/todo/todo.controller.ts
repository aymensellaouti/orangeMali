import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { TodoModel, TodoStatusEnum } from './Model/todo.model';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

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
  @Post()
  addTodo(@Body() todoInfos: Partial<TodoModel>): TodoModel {
    const { name, description } = todoInfos;
    const newTodo = new TodoModel();
    newTodo.id = uuidv4();
    newTodo.name = name;
    newTodo.description = description;
    return newTodo;
  }
}
