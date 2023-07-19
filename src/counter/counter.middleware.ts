import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CounterMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('进入中间件...');
    next(); // 必须调用 next() 方法，否则请求无法继续
  }
}
