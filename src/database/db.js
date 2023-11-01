const mongoose = require('mongoose');

module.exports = {
  connect: function() {
    mongoose.connect('mongodb://127.0.0.1:27017/StudentManagementSystem', { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error', err);
    });
  }
};