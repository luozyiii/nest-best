import { Controller, Post, Body, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
@ApiTags('登录相关')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: '登录' })
  login(@Body() loginAuthDto: CreateUserDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('profile')
  @ApiOperation({ summary: '测试登录拦截' })
  @ApiBearerAuth('access-token')
  getProfile(@Request() req) {
    return req.user;
  }
}
