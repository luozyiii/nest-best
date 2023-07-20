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
import {
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { BookService } from './book.service';
import { Book2Service } from '../book2/book2.service';
import { CreateBookDto, UpdateBookDto, SearchBookDto } from './dto';

@Controller('book')
@ApiTags('书籍')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    @Inject('Category') private categorys: string[],
    @Inject('MyFactory') private myFactory: string,
    private readonly book2Service: Book2Service,
    @Inject('Common') private Common: any,
  ) {}

  @Get('/list')
  @ApiOperation({ summary: '全部书籍' })
  getBooks(): any {
    return this.bookService.getBooks();
  }

  @Get('/page')
  @ApiOperation({ summary: '分页查询书籍' })
  @ApiQuery({ name: 'page', description: '页码', required: true, type: Number })
  @ApiQuery({
    name: 'size',
    description: '分页大小',
    required: true,
    type: Number,
  })
  @ApiResponse({ status: 403, description: '自定义返回信息' })
  getPageBooks(@Query() query): any {
    const { page = 1, size = 10 } = query;
    return this.bookService.getPageBooks(page, size);
  }

  @Get('/category')
  @ApiOperation({ summary: '分类' })
  getCategorys(): string[] {
    console.log(this.myFactory);
    return this.categorys;
  }

  @Post('/add')
  @ApiOperation({ summary: '添加书籍' })
  @ApiBody({ type: CreateBookDto })
  addBook(@Body() body): any {
    return this.bookService.addBook(body);
  }

  @Get('/delete/:id')
  @ApiOperation({ summary: '删除书籍' })
  @ApiParam({ name: 'id', description: '书籍id', required: true })
  deleteBook(@Param() param): any {
    return this.bookService.deleteBook(param.id);
  }

  @Post('/update/:id')
  @ApiOperation({ summary: '更新书籍信息' })
  @ApiParam({ name: 'id', description: '书籍id', required: true })
  @ApiBody({ type: UpdateBookDto })
  updateBook(@Param() param, @Body() body): any {
    return this.bookService.updateBook(param.id, body);
  }

  @Post('/getBookByName')
  @ApiOperation({ summary: '通过书籍名称查询' })
  @ApiBody({ type: SearchBookDto })
  getBookByName(@Body() body): any {
    console.log('body.name', body.name);
    return this.bookService.getBookByName(body.name);
  }

  @Get('/getBookById')
  @ApiOperation({ summary: '通过书籍ID查询' })
  @ApiQuery({ name: 'id', description: '书籍ID', required: true, type: Number })
  getBookById(@Request() req): any {
    // 因为通过Get方式传递过来的是字符串，所有我们需要用parseInt转化为数字
    const id: number = parseInt(req.query.id);
    return this.bookService.getBookById(id);
  }

  @Get('/getBookById2')
  @ApiOperation({ summary: '通过书籍ID查询' })
  @ApiQuery({ name: 'id', description: '书籍ID', required: true, type: Number })
  getBookById2(@Query() query): any {
    const id: number = parseInt(query.id);
    return this.bookService.getBookById(id);
  }

  // 创建动态路由
  @Get('/findBookById/:id')
  @ApiOperation({ summary: '通过书籍ID查询' })
  @ApiParam({ name: 'id', description: '书籍id', required: true })
  findBookById(@Request() req): any {
    const id: number = parseInt(req.params.id);
    return this.bookService.getBookById(id);
  }

  // 多参数的传递
  @Get('/findBookById2/:id/:name')
  @ApiOperation({ summary: '通过书籍ID和名称查询' })
  @ApiParam({ name: 'id', description: '书籍id', required: true })
  @ApiParam({ name: 'name', description: '书籍名称', required: true })
  findBookById2(@Param() param, @Headers() headers): any {
    console.log('name', param.name);
    console.log('headers', headers);
    const id: number = parseInt(param.id);
    return this.bookService.getBookById(id);
  }

  // 测试热重载
  @Get('/hotLoad')
  hotLoad(): any {
    return 'HotLoad Function';
  }

  // 调用 book2Service 方法
  @Get('/getBook2')
  getBook2(): any {
    return this.book2Service.getBook2();
  }

  // 调用全局模块方法
  @Get('/author')
  getAuthor(): any {
    const author = `作者: ${this.Common?.author}`;
    return {
      code: 200,
      data: author,
    };
  }
}
