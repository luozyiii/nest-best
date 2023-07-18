## [NestJS](https://nestjs.com/) 环境搭建和项目创建

[中文文档](https://www.nestjs.com.cn/) 不一定是最新的。

```bash
# node 官网查看安装方法 https：//nodejs.org

# 全局安装NestJS CLI
npm i -g @nestjs/cli

# 创建NestJS项目
nest new nest-best
```

### 目录说明

```
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