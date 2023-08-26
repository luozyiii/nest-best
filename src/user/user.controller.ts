import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: '注册' })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  login(@Body() loginAuthDto: CreateUserDto) {
    return this.userService.login(loginAuthDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '测试登录拦截' })
  @Post('/test')
  test() {
    return {
      code: 200,
      data: '用户已登录',
      msg: 'success',
    };
  }
}
