export const MySQLConfig: any = {
  type: 'mysql', // 数据库类型
  host: '81.71.98.176', // 数据库的连接地址 host
  port: 3306, // 数据库的端口 3306
  username: 'root',
  password: '******',
  database: 'luozhiyi', // 连接的数据库
  retryDelay: 500, // 重试连接数据库间隔
  retryAttempts: 10, // 允许重连次数
  synchronize: true, // 是否将实体同步到数据库
  autoLoadEntities: true, // 自动加载实体配置，forFeature()注册的每个实体都自己动加载
};
