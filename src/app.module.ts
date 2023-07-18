import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MySQLConfig } from '../config/index';

@Module({
  imports: [BookModule, TypeOrmModule.forRoot(MySQLConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
