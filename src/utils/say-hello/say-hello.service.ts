import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class SayHelloService {
  constructor(private loggerService: LoggerService) {}
  hello() {
    this.loggerService.logger('Hello le monde :)');
  }
}
