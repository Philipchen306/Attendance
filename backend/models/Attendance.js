const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    uin: {type: String, required: true},
    classId: {type: String, required: true},
    date: {type: String, required: true},
    takenBy: {type: String, required: true}
});

module.exports = mongoose.model('Attendance', attendanceSchema)