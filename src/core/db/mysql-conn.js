/**
 * created by curdBoy
 * mysql连接
 */
// 注释掉的语句 可选用

const Sequelize = require('sequelize')
const mysqlConfig = require('../../config').mysqlConn

// 实例化mysql
var seq = new Sequelize(mysqlConfig.dbname, mysqlConfig.name, mysqlConfig.password, {
    host: mysqlConfig.host,
    dialect: mysqlConfig.dialect,
    pool: mysqlConfig.pool
})

/**
 * 定义数据模型
 * 
 * @param {any} name 模型名称【数据库表名】
 * @param {any} fields 数据字段集合
 * @returns 数据模型对象
 */

function defineModel (name, fields) {
    var attrs = {};
    for (let key in fields) {
        let value = fields[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    // 可选参数
    // attrs.createAt = {
    //     type: Sequelize.BIGINT,
    //     allowNull: false
    // };
    // attrs.updateAt = {
    //     type: Sequelize.BIGINT,
    //     allowNull: false
    // };
    // attrs.version = {
    //     type: Sequelize.BIGINT,
    //     allowNull: false
    // };


     // 调用seq的方法定义模型
    return seq.define(name, attrs, {
        tableName: name,
        timestamps: false, //true 默认添加createAt updateAt
        // hooks: {  // beforeValidate 保存模型前设置一些值
        //     beforeValidate: function (obj) {
        //         let now = Date.now();
        //         if (obj.isNewRecord) {
        //             obj.createAt = now;
        //             obj.updateAt = now;
        //             obj.version = 0;
        //         } else {
        //             obj.updateAt = now;
        //             ++obj.version;
        //         }
        //     }
        // }
    });
}

export default{
  defineModel
}