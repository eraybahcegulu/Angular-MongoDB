const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  email: String,
  password: String,
  userType: {
    type: String,
    default: 'teacher',
  },
});

module.exports = mongoose.model('Teacher', teacherSchema);