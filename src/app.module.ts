import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FirstModule } from './first/first.module';
import { SecondModule } from './second/second.module';

@Module({
  imports: [FirstModule, SecondModule],
  controllers: [AppController],
})
export class AppModule {}
