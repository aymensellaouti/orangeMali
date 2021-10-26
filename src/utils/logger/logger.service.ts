import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  logger(message: any) {
    console.log('Log from Logger Service : ', message);
  }
}
