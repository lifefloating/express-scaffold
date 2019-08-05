

export default {
  dbname: 'test',
  name: 'root',
  password: 'pwd',
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql', // 数据库类型
  pool: { // 连接池配置
    max: 5,
    min: 0,
    idle: 10000 // 闲时超时
  },
  logging: true // 是否开启日志  方便调试
  // isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ 隔离级别
}

