import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class CustomFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req: Request = ctx.getRequest();
    const response: Response = ctx.getResponse();
    return response.json({
      message: `Le message de l'erreur est  : ` + exception.message,
      status: exception.getStatus(),
      timestamp: new Date().toDateString(),
      path: req.url,
    });
  }
}
