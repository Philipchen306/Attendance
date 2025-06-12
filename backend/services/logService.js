const Log = require('../models/Log');

exports.logChange = async ({ action, previousRecord, newRecord, updatedBy }) => {
    await Log.create({
        action,
        previousRecord,
        newRecord,
        updatedBy,
        updatedAt: new Date(),
    });
};

exports.getLogs = async () => {
    return await Log.find().sort({ updatedAt: -1});
};