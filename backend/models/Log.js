const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    action: {type: String, required: true},
    previousRecord: {type: Object},
    newRecord: {type: Object, required: true},
    updatedAt: {type: Date, default: Date.now},
    updatedBy: {type: String},
})

module.exports = mongoose.model('Log', logSchema);