import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'leslie', description: '用户名' })
  username: string;

  @ApiProperty({ default: '123456', description: '密码' })
  password: string;
}
