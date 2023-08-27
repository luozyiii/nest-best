import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HTTP_CLIENT_ERROR, HTTP_SERVER_ERROR } from '../../config/httpcode';

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
    if (existUser) {
      throw new HttpException(
        { code: HTTP_CLIENT_ERROR, msg: '用户已存在' },
        HttpStatus.OK,
      );
      // throw new Error('用户已存在');
    }
    try {
      const newUser = await this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException(
        { code: HTTP_SERVER_ERROR, msg: '服务器异常' },
        HttpStatus.OK,
      );
      // throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) {
      throw new HttpException(
        { code: HTTP_CLIENT_ERROR, msg: '用户名不存在' },
        HttpStatus.OK,
      );
      // throw new HttpException('用户名不存在', HttpStatus.BAD_REQUEST)
    }
    return user;
  }
}
