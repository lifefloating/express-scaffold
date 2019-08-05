var mongoose = require('mongoose');
var conn = require('../../core/db/db-conn');

var logSchema = mongoose.Schema({
    status_code: { type: String },
    response_time: { type: String },
    url: { type: String },
    body: { type: String },
    query: { type: String},
    headers: { type: String },
    log_date: { type: Date, default: Date.now }
}, { read: 'secondaryPreferred' });

module.exports = conn.admin.model('reqlogs', logSchema);