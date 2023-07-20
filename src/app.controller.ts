import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('全局')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hi')
  @ApiOperation({ summary: 'hi接口', description: '单个接口描述' })
  getHi(): string {
    return 'Hi NestJS.';
  }

  @Get('/corstest')
  @ApiOperation({ summary: '跨域调试' })
  corsTest(): object {
    return { message: '测试跨域请求成功' };
  }
}
