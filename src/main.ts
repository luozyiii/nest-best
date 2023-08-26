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
    .setDescription('这是 Nestjs 提供的接口')
    .setVersion('1.0')
    .addBearerAuth(
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header',
      },
      'access-token',
    )
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
