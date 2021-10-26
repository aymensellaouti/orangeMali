import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoModel } from './Model/todo.model';
import { AddTodoDto } from './dto/add-todo.dto';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  private todos: TodoModel[] = [];
  getTodos(): TodoModel[] {
    return this.todos;
  }
  addTodo(addTodoDto: AddTodoDto): TodoModel {
    const { name, description } = addTodoDto;
    const newTodo = new TodoModel();
    newTodo.id = uuidv4();
    newTodo.name = name;
    newTodo.description = description;
    this.todos.push(newTodo);
    return newTodo;
  }
  getTodoById(id: string): TodoModel {
    return this.findTodoById(id);
  }
  updateTodoById(id: string, updateTodoData: Partial<TodoModel>): TodoModel {
    const todo = this.findTodoById(id);
    const { name, description, status } = updateTodoData;
    todo.name = name ?? todo.name;
    todo.description = description ?? todo.description;
    todo.status = status ?? todo.status;
    return todo;
  }
  deleteTodo(id: string): { count: number } {
    const index = this.todos.findIndex((actualTodo) => actualTodo?.id === id);
    if (index === -1) {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
    this.todos.splice(index, 1);
    return { count: 1 };
  }

  private findTodoById(id: string): TodoModel {
    const todo = this.todos.find((actualTodo) => actualTodo?.id === id);
    if (!todo) {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
    return todo;
  }
}
