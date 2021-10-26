import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { loggerMiddleware } from './middlewares/functions.middlewares';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
  });
  app.use(loggerMiddleware);
  app.use(morgan('dev'));
  // app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  // localhost:3000
  await app.listen(3000);
}
bootstrap();
