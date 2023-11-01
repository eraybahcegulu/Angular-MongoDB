const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email: String,
  password: String,
  userType: {
    type: String,
    default: 'student',
  },
});

module.exports = mongoose.model('Student', studentSchema);