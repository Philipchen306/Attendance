const mongoose = require('mongoose');
const app = require('./server');

const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost:27017/attendanceDB')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
