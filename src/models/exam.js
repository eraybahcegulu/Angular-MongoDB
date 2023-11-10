const mongoose = require('mongoose');

const registeredStudentSchema = new mongoose.Schema({
  no: Number,
  score: {
    type: String,
    default: '-'
  },
});

const examSchema = new mongoose.Schema({
  name: String,
  date: Object,
  time: Object,
  type: String,
  questionType: String,
  numberOfQuestions: Number,
  duration: Number,
  registeredStudents: [registeredStudentSchema],
});

module.exports = mongoose.model('Exam', examSchema);