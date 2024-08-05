import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): object {
    return { message: 'Welcome!', status: 'Ok' };
  }
}
