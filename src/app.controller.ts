import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hi')
  getHi(): string {
    return 'Hi NestJS.';
  }

  @Get('/corstest')
  corsTest(): object {
    return { message: '测试跨域请求成功' };
  }
}
