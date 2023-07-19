import { Module } from '@nestjs/common';
import { Book2Controller } from './book2.controller';
import { Book2Service } from './book2.service';

@Module({
  controllers: [Book2Controller],
  providers: [Book2Service],
  exports: [Book2Service],
})
export class Book2Module {}
