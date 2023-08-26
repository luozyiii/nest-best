import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

// 定义全局中间件方法
function MiddleWareAll(req: any, res: any, next: any) {
  console.log('我是全局中间件.....');
  next();
}

async function bootstrap() {
  dotenv.config(); // 加载环境变量
  const app = await NestFactory.create(AppModule);
  // app.enableCors(); // 允许跨域
  // 使用全局中间件
  app.use(MiddleWareAll);

  const config = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('描述描述描述描述描述描述')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
