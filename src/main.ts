import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { loggerMiddleware } from './middlewares/functions.middlewares';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import { CustomFilter } from './filters/custom.filter';
import { RequestDurationInterceptor } from './interceptors/request-duration.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors({
    origin: 'http://localhost:4200',
  });
  dotenv.config();
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
  // app.useGlobalFilters(new CustomFilter());
  app.useGlobalInterceptors(new RequestDurationInterceptor());
  // app.useGlobalInterceptors(new MapResponseDataInterceptor());
  // localhost:3000
  // console.log(process.env.);
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
