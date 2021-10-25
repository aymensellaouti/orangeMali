import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FirstModule } from './first/first.module';
import { SecondModule } from './second/second.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [FirstModule, SecondModule, TodoModule],
  controllers: [AppController],
})
export class AppModule {}
