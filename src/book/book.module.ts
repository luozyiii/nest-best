import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entities/book.entity';
import { CounterMiddleware } from '../counter/counter.middleware';
import { Book2Service } from '../book2/book2.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [
    BookService,
    Book2Service,
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
export class BookModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CounterMiddleware).forRoutes('book');
  }
}
