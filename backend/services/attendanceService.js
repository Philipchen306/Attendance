const Attendance = require('../models/Attendance');
const logService = require('./logService');

exports.insertAttendance = async (data) => {
    const newAttendance = await Attendance.create(data);
    await logService.logChange({
        action: 'insert',
        newRecord: newAttendance,
        updatedBy: data.takenBy,
    });
    return newAttendance;
};

exports.editAttendance = async (data) => {
    const {uin, classId, date, takenBy} = data ;

    const record = await Attendance.findOne({ uin, classId});
    if (!record) {
        throw new Error('Original attendance record not found');
    };

    // store the original data
     const previousRecord = {
        uin: record.uin,
        classId: record.classId,
        date: record.date,
        takenBy: record.takenBy
    };

    // update data
    record.date = date;
    record.takenBy = takenBy;
    await record.save();

    await logService.logChange({
        action: 'edit',
        previousRecord,
        newRecord: {
            uin: record.uin,
            classId: record.classId,
            date: record.date,
            takenBy: record.takenBy
        },
        updatedBy: takenBy,
        updatedAt: new Date()
    });

    return record;
}


