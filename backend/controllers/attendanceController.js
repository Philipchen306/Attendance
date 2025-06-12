const attendanceService = require('../services/attendanceService');

exports.handleInsertOrEdit = async (req, res) => {
    const {action, data} = req.body;
    console.log(req.body);
    try {
        if (action === 'insert') {
            const result = await attendanceService.insertAttendance(data);
            return res.status(201).json(result);
        } else if (action === 'edit') {
            const result = await attendanceService.editAttendance(data);
            return res.status(200).json(result);
        } else {
            return res.status(400).json({ error : 'Invalid action'});
        } 
    } catch (error) {
        console.error(error);
        if (error.message === 'Original attendance record not found') {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Server error' });
    }
};