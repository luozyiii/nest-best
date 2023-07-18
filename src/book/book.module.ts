import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [
    BookService,
    {
      provide: 'Category',
      useValue: ['武侠', '修仙', '都市'],
    },
    {
      provide: 'MyFactory',
      useFactory() {
        return '自定义工厂（方法）';
      },
    },
  ],
  controllers: [BookController],
})
export class BookModule {}
