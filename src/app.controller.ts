import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './decorators/public.decorator';

@Controller()
@ApiTags('全局')
@ApiBearerAuth('access-token')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
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
