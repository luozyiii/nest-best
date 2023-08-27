import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { HTTP_SUCCESS } from '../../config/httpcode';

@Injectable()
export class BookService {
  // 依赖注入
  constructor(
    @InjectRepository(Book) private readonly book: Repository<Book>,
  ) {}

  async getBooks() {
    const data = await this.book.find();
    return {
      code: HTTP_SUCCESS,
      data: data?.map((item: any) => {
        const { id, name } = item;
        return {
          id,
          name,
        };
      }),
      msg: 'success',
    };
  }

  async getPageBooks(page: number, size: number) {
    const records = await this.book.find({
      skip: (page - 1) * size,
      take: size,
    });
    const total = await this.book.count();
    return {
      code: HTTP_SUCCESS,
      data: {
        page,
        size,
        records,
        total,
      },
      msg: 'success',
    };
  }

  async addBook(body: any) {
    const book = new Book();
    const { name, description } = body;
    book.name = name;
    book.description = description;
    const data = await this.book.save(book);
    return {
      code: HTTP_SUCCESS,
      data: data,
      msg: '添加书籍成功',
    };
  }

  async deleteBook(id: number) {
    await this.book.delete(id);
    return {
      code: HTTP_SUCCESS,
      data: null,
      msg: '删除书籍成功',
    };
  }

  async updateBook(id: number, body: any) {
    const book = new Book();
    const { name, description } = body;
    book.name = name;
    book.description = description;
    await this.book.update(id, book);
    return {
      code: HTTP_SUCCESS,
      data: null,
      msg: '更新书籍成功',
    };
  }

  async getBookByName(name: string) {
    const data = await this.book.find({
      where: {
        name: Like(`%${name}%`),
      },
    });
    return {
      code: HTTP_SUCCESS,
      data: data,
      msg: 'success',
    };
  }

  async getBookById(id: any) {
    const data = await this.book.findOneBy({
      id,
    });
    return {
      code: HTTP_SUCCESS,
      data: data,
      msg: 'success',
    };
  }
}
