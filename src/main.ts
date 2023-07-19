import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 定义全局中间件方法
function MiddleWareAll(req: any, res: any, next: any) {
  console.log('我是全局中间件.....');
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors(); // 允许跨域
  // 使用全局中间件
  app.use(MiddleWareAll);

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
