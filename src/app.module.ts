import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { mysqlConfig, mongodbUrl } from '../config/index';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { BookModule } from './book/book.module';
import { Book2Module } from './book2/book2.module';
import { TemplateModule } from './template/template.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...mysqlConfig }),
    MongooseModule.forRoot(mongodbUrl),
    CommonModule,
    BookModule,
    Book2Module,
    TemplateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
