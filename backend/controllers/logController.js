const logService = require('../services/logService');

exports.getAllLogs = async (req, res) => {
    try {
        const logs = await logService.getLogs();
        res.status(200).json(logs);
    } catch (err) {
        res.status(404).json({ error: 'Fail to fetch logs'});
    }
};
