import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './book/book.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MySQLConfig } from '../config/index';
import { Book2Module } from './book2/book2.module';
import { CommonModule } from './common/common.module';
import { TemplateModule } from './template/template.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://81.71.98.176:27017/fe_cli'),
    BookModule,
    TypeOrmModule.forRoot({ ...MySQLConfig }),
    Book2Module,
    CommonModule,
    TemplateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
