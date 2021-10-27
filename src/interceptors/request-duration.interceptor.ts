import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class RequestDurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // récupérer la date d'entrée
    const request: Request = context.switchToHttp().getRequest();
    const inDate = Date.now();
    return next.handle().pipe(
      tap(() => {
        // récupérer la date de sortie
        const outDate = Date.now();
        console.log(
          `La durée de la requéte ${request.url} est de ${outDate - inDate} ms`,
        );
      }),
    );
  }
}
