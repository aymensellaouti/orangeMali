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
import { ConfigModule } from '@nestjs/config';
import devConfiguration from './config/dev.configuration';
import prodConfiguration from './config/prod.configuration';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "./todo/entities/todo.entity";
@Module({
  imports: [
    FirstModule,
    SecondModule,
    TodoModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        process.env.NODE_ENV === 'development'
          ? devConfiguration
          : prodConfiguration,
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'orange-mali',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [LoggerService, SayHelloService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    console.log('ENV', process.env.NODE_ENV);
    consumer.apply(FirstMiddleware).forRoutes('todo');
    consumer.apply(SecondMiddleware).forRoutes('');
  }
}
