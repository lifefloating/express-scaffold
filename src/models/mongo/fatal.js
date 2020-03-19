var mongoose = require('mongoose');
var conn = require('../../core/db/db-conn');

var logSchema = mongoose.Schema({
    type: { type: String },
    errMsg: { type: String },
    log_date: { type: Date, default: Date.now }
}, { read: 'secondaryPreferred' });

// module.exports = conn.admin.model('fatals', logSchema);