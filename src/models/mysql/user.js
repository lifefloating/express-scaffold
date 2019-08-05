/**
 * user 测试 sequlize
 */
'use strict'

let mysqlConn = require('../../core/db/mysql-conn')
let seq = require('sequelize')


var User = mysqlConn.defineModel('test_user', {
    name: seq.STRING,
    mobile: seq.STRING
})
User.removeAttribute('id') // 表无主键情况
User.sync({force: true}) 
// 同步表结构  force 已经有表的情况下不建议使用 会先执行drop table if exists xxx
module.exports = User;