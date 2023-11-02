const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  no: Number,
  password: String,
  midterm: {
    type: String,
    default: '-'
  },
  final: {
    type: String,
    default: '-'
  },
  absenteeism: {
    type: String,
    default: '-'
  },
  userType: {
    type: String,
    default: 'student',
  },
});

module.exports = mongoose.model('Student', studentSchema);