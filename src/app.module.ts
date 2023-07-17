import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
