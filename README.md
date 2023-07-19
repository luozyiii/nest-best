# [NestJS](https://nestjs.com/) 快速入门

[中文文档](https://www.nestjs.com.cn/) 不一定是最新的。

NestJS 是一个基于 TypeScript 的开发框架，它建立在 Express、Fastify 和其他 Node.js Web 框架之上，提供了一种用于构建高效、可扩展的服务器端应用程序的方式。相比于传统的 Express 和 Koa 框架，NestJS 提供了更多的功能和抽象层，使得开发者可以更轻松地构建复杂的应用程序。

##### NestJS、Koa 和 Express 的一些对比：

- 架构模式：NestJS 使用了基于模块化的架构模式，它将应用程序划分为模块、控制器和提供者。这种模式使得代码的组织和维护更加容易。而 Koa 和 Express 则没有明确的架构模式，开发者需要自己组织代码结构。

- TypeScript 支持：NestJS 是一个完全基于 TypeScript 的框架，它提供了强大的静态类型检查和面向对象编程的能力。而 Koa 和 Express 都是基于 JavaScript 的框架，虽然可以使用 TypeScript，但是缺乏一些 TypeScript 特有的功能和类型检查。

- 中间件支持：Koa 和 Express 都有强大的中间件支持，可以方便地添加和处理中间件。NestJS 也支持中间件，但是它使用了自己的装饰器和管道机制来处理中间件，使得中间件的使用更加灵活。

- 异步编程：NestJS 提供了强大的异步编程支持，包括异步模块、异步提供者和异步管道等。这使得开发者可以更好地处理异步操作，如数据库查询、网络请求等。Koa 和 Express 也支持异步编程，但是相对于 NestJS 来说，它们的异步支持相对较弱。

总体而言，NestJS 提供了更多的功能和抽象层，使得开发者可以更轻松地构建复杂的应用程序。如果你喜欢使用 TypeScript、需要更强大的架构模式和异步编程支持，那么 NestJS 是一个很好的选择。如果你对简洁性和灵活性更加看重，那么 Koa 和 Express 也是不错的选择。最终选择哪个框架还要根据具体的项目需求和个人偏好来决定。

## NestJS 环境搭建和项目创建

```bash
# node 官网查看安装方法 https：//nodejs.org

# 全局安装NestJS CLI
npm i -g @nestjs/cli

# 创建NestJS项目
nest new nest-best
```

### 目录说明

```bash
├── dist                        # 编译后的目录，打包产物
├── node_modules                # 项目依赖包
├── REST_Client                 # 结合 vs code 插件 REST Client 调试接口示例
├── src                         # 源码目录
│   ├── app.controller.spec.ts  # 对于基本控制器的单元测试样例
│   ├── app.controller.ts       # 控制器文件，可以简单理解为路由文件
│   ├── app.module.ts           # 模块文件，在NestJS世界里主要操作的就是模块
│   ├── app.service.ts          # 服务文件，提供的服务文件，业务逻辑编写在这里
│   └── main.ts                 # 项目的入口文件，里边包括项目的主模块和监听端口号
├── test                        # 测试文件目录，对项目测试时使用的目录，比如单元测试...
│   ├── app.e2e-spec.ts         # e2e测试，端对端测试文件，测试流程和功能使用
│   └── jest-e2e.json           # jest 配置文件
├── .eslintrc.js                # eslint 配置
├── .gitignore                  # git忽略文件
├── .prettierrc                 # prettier 配置
├── nest-cli.json               # 整个项目的配置文件，这个需要根据项目进行不同的配置
├── package.json                # 项目依赖包管理文件和Script文件，比如如何启动项目的命令
├── tsconfig.build.json         # TypeScript语法构建时的配置文件
├── tsconfig.json               # TypeScript的配置文件，控制TypeScript编译器的一些行为
└── README.md                   # 文档说明

```

### vscode 插件 【REST Client】

```bash
# http 示例目录
REST_Client
```

## 基础命令

### 开始

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### 测试

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### 部署

1、项目根目录创建 Dockerfile

```Dockerfile
# 使用Node.js作为基础镜像
FROM node:20-alpine3.18

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json文件到工作目录
COPY package*.json ./

# npm 源，选用国内镜像源以提高下载速度
RUN npm config set registry https://registry.npm.taobao.org/

# 安装依赖
RUN npm install

# 复制应用程序的源代码到工作目录
COPY . .

# 暴露应用程序的端口
EXPOSE 3000

# 启动应用程序
CMD ["npm", "run", "start:prod"]
```

```bash
# 2、导航到您的NestJS应用程序的根目录，并运行以下命令来构建Docker镜像：
docker build -t nest-best .

# 3、使用以下命令在Docker容器中运行您的NestJS应用程序：
docker run -d -p 3000:3000 nest-best -name nest-best

# docker run: 运行一个新的容器。
# -d: 在后台运行容器。
# -p 3000:3000: 将容器的端口3000映射到主机的端口3000，这样可以通过主机的端口访问容器中运行的应用程序。
# nest-best: 要运行的容器的名称或镜像。
# -name nest-best: 设置容器的名称为"nest-best"。
```

http://81.71.98.176:3000/ ，看到 Hello World!，说明部署成功。

## 入门

### 创建一个 book 模块和路由

```bash
nest g module book

# 用命令行创建 controller
nest g controller book --no-spec

# 用命令行创建 service
nest g service book --no-spec
```

### Get、Post、Request、Query、Body、Param、Headers 修饰器

## ORM - 操作数据库

ORM：定义一个对象，这个对象就对应着一张表，这个对象的一个实例，就对应着表中的一条记录。

### docker 安装 mysql

```bash
# 安装 https://www.runoob.com/docker/docker-install-mysql.html

# 拉取最新镜像
docker pull mysql:latest

# 运行容器
# MYSQL_ROOT_PASSWORD=123456：设置 MySQL 服务 root 用户的密码。
docker run -itd --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql

# 修改容器时区
# 进入容器
docker exec -u 0 -it 容器ID bash
# 执行
mv /etc/localtime /etc/localtime.bak && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

### TypeORM

```bash
# 安装
npm install --save @nestjs/typeorm typeorm mysql2
```

我们直接再/src/app.module.ts 中引入 typeorm。

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: '81.71.98.176', // 数据库的连接地址 host
      port: 3306, // 数据库的端口 3306
      username: 'root',
      password: '******',
      database: 'test', // 连接的数据库
      retryDelay: 500, // 重试连接数据库间隔
      retryAttempts: 10, // 允许重连次数
      synchronize: true, // 是否将实体同步到数据库
      autoLoadEntities: true, // 自动加载实体配置，forFeature()注册的每个实体都自己动加载
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

#### 编写 Entities 实体

/src/book/ectities/book.entity.ts

```ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;
}
```

编写好类之后，需要在 book.module.ts 里进行引入

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  ...
})
export class BookModule {}
```

#### 对数据库的增删改查 book.service.ts

```ts
// 依赖导入
import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
```

引入后我们要在构造函数里增加一个依赖注入的操作。

```ts
export class BookService {
  // 依赖注入
  constructor(
    @InjectRepository(Book) private readonly book: Repository<Book>,
  ) {}
  ...
}
```

完整增删改查示例

```ts
// book.service.ts
import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  // 依赖注入
  constructor(
    @InjectRepository(Book) private readonly book: Repository<Book>,
  ) {}

  async getBooks() {
    const data = await this.book.find();
    return {
      code: 200,
      data: data,
      msg: 'success',
    };
  }
  async addBook(body: any) {
    const book = new Book();
    const { name, description } = body;
    book.name = name;
    book.description = description;
    const data = await this.book.save(book);
    return {
      code: 200,
      data: data,
      msg: '添加书籍成功',
    };
  }
  async deleteBook(id: number) {
    await this.book.delete(id);
    return {
      code: 200,
      data: null,
      msg: '删除书籍成功',
    };
  }
  async updateBook(id: number, body: any) {
    const book = new Book();
    const { name, description } = body;
    book.name = name;
    book.description = description;
    await this.book.update(id, book);
    return {
      code: 200,
      data: null,
      msg: '更新书籍成功',
    };
  }
  async getBookByName(name: string) {
    const data = await this.book.find({
      where: {
        name: Like(`%${name}%`),
      },
    });
    return {
      code: 200,
      data: data,
      msg: 'success',
    };
  }
  async getBookById(id: any) {
    const data = await this.book.findOneBy({
      id,
    });
    return {
      code: 200,
      data: data,
      msg: 'success',
    };
  }
}
```

```ts
// book.controller.ts
import {
  Controller,
  Get,
  Post,
  Request,
  Query,
  Body,
  Param,
  Headers,
} from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks(): any {
    return this.bookService.getBooks();
  }

  @Post('/add')
  addBook(@Body() body): any {
    return this.bookService.addBook(body);
  }

  @Get('/delete/:id')
  deleteBook(@Param() param): any {
    return this.bookService.deleteBook(param.id);
  }

  @Post('/update/:id')
  updateBook(@Param() param, @Body() body): any {
    return this.bookService.updateBook(param.id, body);
  }

  @Post('/getBookByName')
  getBookByName(@Body() body): any {
    console.log('body.name', body.name);
    return this.bookService.getBookByName(body.name);
  }

  @Get('/getBookById')
  getBookById(@Request() req): any {
    // 因为通过Get方式传递过来的是字符串，所有我们需要用parseInt转化为数字
    const id: number = parseInt(req.query.id);
    return this.bookService.getBookById(id);
  }
}
```

## Providers(提供者)实现依赖注入

### 自定义注入值

```ts
// book.module.ts 注入
providers: [
  {
    provide: 'Category',
    useValue: ['武侠', '修仙', '都市'],
  },
],
// book.controller.ts 使用
constructor(@Inject('Category') private categorys: string[]) {}

@Get('/category')
getCategorys(): string[] {
  return this.categorys;
}

// test
http://localhost:3000/book/category
```

### 自定义工厂（方法）

```ts
// book.module.ts 注入
providers: [
  ...,
  {
    provide: 'MyFactory',
    useFactory() {
      return '自定义工厂（方法）';
    },
  },
],

// book.controller.ts 使用
constructor(
  ...,
  @Inject('MyFactory') private myFactory: string,
) {}

@Get('/category')
getCategorys(): string[] {
  console.log(this.myFactory);
  return this.categorys;
}
```

## 增加热重载功能

```bash
# 安装依赖
npm i --save-dev webpack-node-externals run-script-webpack-plugin webpack @types/webpack-env
```

```js
// 项目根目录下增加一个webpack-hmr.config.js的配置文件
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({
        name: options.output.filename,
        autoRestart: false,
      }),
    ],
  };
};
```

```bash
# 替换启动脚本
"start:dev": "nest build --webpack --webpackPath webpack-hmr.config.js --watch",

# 重新启动项目
npm run start:dev
```

然后在/src/book/book.controller.ts 文件里增加一个 hotLoad() 方法测试。

```ts
@Get('/hotLoad')
hotLoad(): any {
  return 'HotLoad Function';
}
```

## 中间件 Middleware

### 局部中间件

```bash
# 命令生成
nest g mi counter

# CREATE src/counter/counter.middleware.spec.ts
# CREATE src/counter/counter.middleware.ts
```

```ts
// counter.middleware.ts 打印一下
console.log('进入中间件...');
next(); // 必须调用 next() 方法，否则请求无法继续
```

```ts
// book.module.ts使用
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CounterMiddleware } from '../counter/counter.middleware';

export class BookModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CounterMiddleware).forRoutes('book');
  }
}
```

发起请求 http://localhost:3000/book/list ，控制台看到输出，说明中间件起作用了。

### 全局中间件

局部中间件我们是以实现 NestModule 接口的形式,把中间件挂在到 Moudle 上的.而全局中间件要以 function 的形式 编写到 main.ts 里。

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 定义全局中间件方法
function MiddleWareAll(req: any, res: any, next: any) {
  console.log('我是全局中间件.....');
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 使用全局中间件
  app.use(MiddleWareAll);

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
```

发起请求 http://localhost:3000/hi ，控制台看到输出，说明中间件起作用了。

### 中间件 Middleware-用第三方中间件实现跨域

NestJS 是自带配置项的`app.enableCors(); `(main.ts)，可以通过简单的配置完成跨域操作。这里主要是学习一下 use 第三方中间件。

```bash
# 安装依赖
npm install cors
npm install @types/cors -D
```

```ts
// app.controller.ts
@Get('/corstest')
corsTest(): object {
  return { message: '测试跨域请求成功' };
}

// main.ts
import * as cors from 'cors';

app.use(cors());
```

打开 www.baidu.com, f12 控制台

```ts
// 设置跨域前后都调用一下
fetch('http://localhost:3000/book/list')
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  });
```

## 模块 Module

### 模块之间相互调用（共享）

```bash
# 创建 book2 模块
nest g module book2
# 用命令行创建 controller
nest g controller book2 --no-spec
# 用命令行创建 service
nest g service book2 --no-spec
```

```ts
// book2.service.ts 增加 getBook2 方法
import { Injectable } from '@nestjs/common';

@Injectable()
export class Book2Service {
  async getBook2() {
    return {
      code: 200,
      data: '调用 Book2Service 方法成功',
      msg: 'success',
    };
  }
}
```

```ts
// book2.module.ts 导出 Book2Service
import { Module } from '@nestjs/common';
import { Book2Controller } from './book2.controller';
import { Book2Service } from './book2.service';

@Module({
  controllers: [Book2Controller],
  providers: [Book2Service],
  exports: [Book2Service],
})
export class Book2Module {}
```

```ts
// 在 book.module.ts 引入 Book2Service
// 然后注入 providers
import { Book2Service } from '../book2/book2.service';

@Module({
  providers: [
    Book2Service,
    ...
  ],
})
```

```ts
// 最后在 book.controller.ts 进行引入使用
import { Book2Service } from 'src/book2/book2.service';

@Controller('book')
export class BookController {
  ...

  // 调用 book2Service 方法
  @Get('/getBook2')
  getBook2(): any {
    return this.book2Service.getBook2();
  }
}

```

调用 http://localhost:3000/book/getBook2，看到结果返回，即实现了跨模块调用

### 全局模块

```bash
# 创建模块
nest g module common
```

```ts
// common.module.ts
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'Common',
      useValue: { author: 'Leslie' },
    },
  ],
  exports: [
    {
      provide: 'Common',
      useValue: { author: 'Leslie' },
    },
  ],
})
export class CommonModule {}
```

```ts
// 在 app.module.ts 引入 全局模块
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ...,
    CommonModule,
  ],
})
export class AppModule {}
```

```ts
// book.controller.ts 中依赖注入，并使用
@Controller('book')
export class BookController {
  constructor(
    ...,
    @Inject('Common') private Common: any,
  ) {}

  // 调用全局模块方法
  @Get('/author')
  getAuthor(): any {
    const author = `作者: ${this.Common?.author}`;
    return {
      code: 200,
      data: author,
    };
  }
}
```

调用 http://localhost:3000/book/author 验证。

## 持续更新...
