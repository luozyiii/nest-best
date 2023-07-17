import {
  Controller,
  Get,
  Post,
  Request,
  Query,
  Body,
  Param,
  Headers,
} from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get()
  getBooks(): any {
    return this.bookService.getBooks();
  }

  @Post('/add')
  addBook(@Body() body): any {
    console.log('body', body);
    return this.bookService.addBook();
  }

  @Get('/getBookById')
  getBookById(@Request() req): any {
    // 因为通过Get方式传递过来的是字符串，所有我们需要用parseInt转化为数字
    const id: number = parseInt(req.query.id);
    return this.bookService.getBookById(id);
  }

  @Get('/getBookById2')
  getBookById2(@Query() query): any {
    const id: number = parseInt(query.id);
    return this.bookService.getBookById(id);
  }

  // 创建动态路由
  @Get('/findBookById/:id')
  findBookById(@Request() req): any {
    const id: number = parseInt(req.params.id);
    return this.bookService.getBookById(id);
  }

  // 多参数的传递
  @Get('/findBookById2/:id/:name')
  findBookById2(@Param() param, @Headers() headers): any {
    console.log('name', param.name);
    console.log('headers', headers);
    const id: number = parseInt(param.id);
    return this.bookService.getBookById(id);
  }
}
