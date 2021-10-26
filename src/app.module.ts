import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { FirstModule } from './first/first.module';
import { SecondModule } from './second/second.module';
import { TodoModule } from './todo/todo.module';
import { LoggerService } from './utils/logger/logger.service';
import { SayHelloService } from './utils/say-hello/say-hello.service';
import { FirstMiddleware } from './middlewares/first.middleware';
import { SecondMiddleware } from './middlewares/second.middleware';
import { loggerMiddleware } from './middlewares/functions.middlewares';

@Module({
  imports: [FirstModule, SecondModule, TodoModule],
  controllers: [AppController],
  providers: [LoggerService, SayHelloService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(FirstMiddleware).forRoutes('todo');
    consumer.apply(SecondMiddleware).forRoutes('');
  }
}
