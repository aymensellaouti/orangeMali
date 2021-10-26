import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FirstModule } from './first/first.module';
import { SecondModule } from './second/second.module';
import { TodoModule } from './todo/todo.module';
import { LoggerService } from './utils/logger/logger.service';
import { SayHelloService } from './utils/say-hello/say-hello.service';

@Module({
  imports: [FirstModule, SecondModule, TodoModule],
  controllers: [AppController],
  providers: [LoggerService, SayHelloService],
})
export class AppModule {}
