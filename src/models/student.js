const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: String,
  date: { type: Date, default: Date.now },
});

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
  messages: [messageSchema],
});
module.exports = mongoose.model('Messsage', messageSchema);
module.exports = mongoose.model('Student', studentSchema);