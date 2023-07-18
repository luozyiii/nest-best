import {
  Controller,
  Get,
  Post,
  Request,
  Query,
  Body,
  Param,
  Headers,
  Inject,
} from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    @Inject('Category') private categorys: string[],
    @Inject('MyFactory') private myFactory: string,
  ) {}

  @Get('/list')
  getBooks(): any {
    return this.bookService.getBooks();
  }

  @Get('/page')
  getPageBooks(@Query() query): any {
    const { page = 1, size = 10 } = query;
    return this.bookService.getPageBooks(page, size);
  }

  @Get('/category')
  getCategorys(): string[] {
    console.log(this.myFactory);
    return this.categorys;
  }

  @Post('/add')
  addBook(@Body() body): any {
    return this.bookService.addBook(body);
  }

  @Get('/delete/:id')
  deleteBook(@Param() param): any {
    return this.bookService.deleteBook(param.id);
  }

  @Post('/update/:id')
  updateBook(@Param() param, @Body() body): any {
    return this.bookService.updateBook(param.id, body);
  }

  @Post('/getBookByName')
  getBookByName(@Body() body): any {
    console.log('body.name', body.name);
    return this.bookService.getBookByName(body.name);
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
