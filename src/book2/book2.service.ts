import { Injectable } from '@nestjs/common';

@Injectable()
export class Book2Service {
  async getBook2() {
    return {
      code: 200,
      data: '调用 Book2Service 方法成功',
      msg: 'success',
    };
  }
}
