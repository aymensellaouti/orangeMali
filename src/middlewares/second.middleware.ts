import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class SecondMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('je suis le second middleware');
    next();
  }
}
