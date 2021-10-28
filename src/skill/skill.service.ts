import { Injectable } from '@nestjs/common';
import { CrudService } from '../Generics/crud.service';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SkillService extends CrudService<Skill> {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {
    super(skillRepository);
  }
}
