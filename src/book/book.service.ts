import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  getBooks() {
    return {
      code: 200,
      data: ['西游记', '三国演义', '水浒传'],
      msg: '请求书本列表成功',
    };
  }
  addBook() {
    return {
      code: 200,
      data: {
        id: 4,
        name: '红楼梦',
      },
      msg: '添加书本成功',
    };
  }
  getBookById(id: number) {
    let reJson: any = {};
    switch (id) {
      case 1:
        reJson = { id: 1, name: '西游记' };
        break;
      case 2:
        reJson = { id: 2, name: '三国演义' };
        break;
      case 3:
        reJson = { id: 3, name: '水浒传' };
        break;
    }
    return reJson;
  }
}
