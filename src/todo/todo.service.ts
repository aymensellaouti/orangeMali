import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoModel } from './Model/todo.model';
import { AddTodoDto } from './dto/add-todo.dto';

import { v4 as uuidv4 } from 'uuid';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Like, Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { SearchTodoDto } from './dto/search-todo.dto';
import { paginateQbFunction } from '../Generics/qb functions/paginate.qb.function';
import { DateIntervalDto } from '../Generics/dto/date-interval.dto';
import { setDateInterval } from '../Generics/qb functions/date-intervale.qb.function';

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
  findAllTodoDb(searchCritrias: SearchTodoDto): Promise<TodoEntity[]> {
    const criterias = [];
    if (searchCritrias.criteria) {
      criterias.push({ name: Like(`%${searchCritrias.criteria}%`) });
      criterias.push({ description: Like(`%${searchCritrias.criteria}%`) });
    }
    if (searchCritrias.status) {
      criterias.push({ status: searchCritrias.status });
    }
    return this.todoRepository.find({
      where: criterias,
    });
  }
  findQBAllTodoDb(searchCritrias: SearchTodoDto): Promise<TodoEntity[]> {
    const { criteria, status, pageNumber, pageSize } = searchCritrias;
    const qb = this.todoRepository.createQueryBuilder('t');
    if (criteria) {
      qb.andWhere(
        `(
         (t.name like :criteria) or
         (t.description like :criteria) 
        )`,
        { criteria: `%${criteria}%` },
      );
    }

    if (status) {
      qb.andWhere('t.status = :status', { status });
    }
    if (pageSize) {
      paginateQbFunction(qb, pageSize, pageNumber);
    }

    return qb.getMany();
  }
  async findTodoByIdDb(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne(id);
    console.log(todo);
    if (!todo) {
      throw new NotFoundException('Todo Inexistant');
    }
    return todo;
  }
  getStatsTodosStatus(dateIntervalDto: DateIntervalDto): Promise<any> {
    const qb = this.todoRepository.createQueryBuilder('t');
    const { startDate, endDate } = dateIntervalDto;
    qb.select('status, count(status) as todo_number').groupBy('status');
    setDateInterval(qb, startDate, endDate, 'created_at');
    return qb.getRawMany();
  }
}
