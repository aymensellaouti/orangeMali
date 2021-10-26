import { Module } from '@nestjs/common';
import { FirstController } from './first.controller';
import { LoggerService } from '../utils/logger/logger.service';
import { SayHelloService } from '../utils/say-hello/say-hello.service';

@Module({
  controllers: [FirstController],
  providers: [LoggerService, SayHelloService],
})
export class FirstModule {}
