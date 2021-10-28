import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export class CrudService<T> {
  constructor(private readonly repository: Repository<T>) {}
  create(entityDto): Promise<T> {
    return this.repository.save(entityDto);
  }
  findAll(options = {}): Promise<T[]> {
    return this.repository.find(options);
  }
  async findOne(id: number | string): Promise<T> {
    const entity = await this.repository.findOne(id);
    if (!entity) {
      throw new NotFoundException('element Inexistant');
    }
    return entity;
  }
  async update(id: number | string, updateDto): Promise<T> {
    const updatedEntity = await this.repository.preload({
      id,
      ...updateDto,
    });
    if (!updatedEntity) {
      throw new NotFoundException('Element Innexistant');
    }
    return this.repository.save(updatedEntity);
  }
  async remove(id: number | string): Promise<UpdateResult> {
    const result = await this.repository.softDelete(id);
    if (!result.affected) {
      throw new NotFoundException('Erreur');
    }
    return result;
  }
  async restore(id: number): Promise<UpdateResult> {
    const result = await this.repository.restore(id);
    if (!result.affected) {
      throw new NotFoundException('Erreur');
    }
    return result;
  }
}
