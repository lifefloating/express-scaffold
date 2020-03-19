var mongoose = require('mongoose');
var conn = require('../../core/db/db-conn');

var logSchema = mongoose.Schema({
    platform: { type: String },     // web or mobile or weixin or ...
    desc: { type: String }, // 报错详情
    brief: { type: String }, // 报错 brief
    parameter: { type: String }, // 传参
    method: { type: String },  // 塞入方法中传入的值 可以是入参可以是body等
    env: { type: String },  // 环境 dev / prod
    headers: { type: String },  // 请求头
    ip: { type: String },  // 请求ip
    level: {type: String}, // 报错level error warning info debug
    log_date: { type: Date, default: Date.now }  // date
}, { read: 'secondaryPreferred' });

// module.exports = conn.admin.model('logs', logSchema);