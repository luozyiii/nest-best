import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import encry from '../utils/crypto';
import { HTTP_CLIENT_ERROR, HTTP_SUCCESS } from '../../config/httpcode';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(loginAuthDto: CreateUserDto) {
    const { username, password } = loginAuthDto;
    const user = await this.userService.findOne(username);
    if (user?.password !== encry(password, user.salt)) {
      throw new HttpException(
        { code: HTTP_CLIENT_ERROR, msg: '密码错误' },
        HttpStatus.OK,
      );
      // throw new HttpException('密码错误', HttpStatus.UNAUTHORIZED);
    }
    const payload = { username: user.username, sub: user.id };
    const token = await this.jwtService.signAsync(payload);

    return {
      code: HTTP_SUCCESS,
      data: {
        token,
        userInfo: {
          username: user.username,
          avatar: user.avatar,
          email: user.email,
          create_time: user.create_time,
        },
      },
      msg: 'success',
    };
  }
}
