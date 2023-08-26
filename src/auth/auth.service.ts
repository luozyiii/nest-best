import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import encry from '../utils/crypto';

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
      throw new HttpException('密码错误', HttpStatus.UNAUTHORIZED);
    }
    const payload = { username: user.username, sub: user.id };
    const token = await this.jwtService.signAsync(payload);

    return {
      code: 200,
      data: token,
      msg: 'success',
    };
  }
}
