const Teacher = require('../models/teacher');

async function findTeacherForLogin(email, password) {
  return await Teacher.findOne({ email, password });
}

module.exports = { findTeacherForLogin };