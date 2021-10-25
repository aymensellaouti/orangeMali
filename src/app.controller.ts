import { Controller, Get } from '@nestjs/common';

class Message {
  message: string;
}

@Controller()
export class AppController {
  @Get()
  getHello(): Message {
    return { message: 'Cc Orange Mali' };
  }
}
