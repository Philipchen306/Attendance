const express = require('express');
const cors = require('cors');
const attendanceRoutes = require('./routes/attendanceRoutes');
const logRoutes = require('./routes/logRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API running'));
app.use('/attendance', attendanceRoutes);
app.use('/logs', logRoutes);

module.exports = app;
