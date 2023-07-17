## [NestJS](https://www.nestjs.com.cn/) 环境搭建和项目创建

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

### ORM - 数据库操作
