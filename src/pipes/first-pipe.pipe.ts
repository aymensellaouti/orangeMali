import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { AddTodoDto } from '../todo/dto/add-todo.dto';

@Injectable()
export class FirstPipePipe implements PipeTransform {
  transform(addTodoDto: AddTodoDto, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      addTodoDto.name = addTodoDto.name + ' cc';
    }
    return addTodoDto;
  }
}
