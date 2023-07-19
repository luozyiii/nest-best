import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MySQLConfig } from '../config/index';
import { Book2Module } from './book2/book2.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    BookModule,
    TypeOrmModule.forRoot({ ...MySQLConfig }),
    Book2Module,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
