import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import encry from '../utils/crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existUser) throw new Error('用户已存在');
    try {
      const newUser = await this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) throw new HttpException('用户名不存在', HttpStatus.BAD_REQUEST);
    return user;
  }

  async login(loginAuthDto: CreateUserDto) {
    const { username, password } = loginAuthDto;
    const user = await this.findOne(username);
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
