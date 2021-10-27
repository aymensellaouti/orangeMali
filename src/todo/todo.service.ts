import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoModel } from './Model/todo.model';
import { AddTodoDto } from './dto/add-todo.dto';

import { v4 as uuidv4 } from 'uuid';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}
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
  updateTodoById(id: string, updateTodoData: UpdateTodoDto): TodoModel {
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

  // getDbTodos(): Promise<TodoModel[]> {
  //   return [];
  // }
  addDbTodo(todoInfos: AddTodoDto): Promise<TodoEntity> {
    return this.todoRepository.save(todoInfos);
  }
  async updateDbTodoById(id: number, updateTodoData: UpdateTodoDto) {
    const updatedTodo = await this.todoRepository.preload({
      id,
      ...updateTodoData,
    });
    if (!updatedTodo) {
      throw new NotFoundException('Todo Innexistant');
    }
    return this.todoRepository.save(updatedTodo);
  }

  async deleteDbTodo(id: number) {
    const result = await this.todoRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException('Todo Innexistant');
    }
    return result;
  }
  async softDeleteDbTodo(id: number): Promise<UpdateResult> {
    const result = await this.todoRepository.softDelete(id);
    if (!result.affected) {
      throw new NotFoundException('Erreur');
    }
    return result;
  }
  async restoreSoftDeletedDbTodo(id: number): Promise<UpdateResult> {
    const result = await this.todoRepository.restore(id);
    if (!result.affected) {
      throw new NotFoundException('Erreur');
    }
    return result;
  }
  findAllTodoDb(): Promise<TodoEntity[]> {
    return this.todoRepository.find({
      // select: ['id', 'name'],
    });
  }
}
