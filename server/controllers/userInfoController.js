const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const Teacher = require('../models/teacher');

async function getUserInfo(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const student = decodedToken.userType === 'student' ? await Student.findById(decodedToken.userId) : null;
    const teacher = decodedToken.userType === 'teacher' ? await Teacher.findById(decodedToken.userId) : null;

    if (!student && !teacher) {
      return res.status(404).json({ status: 404, message: 'User not found.' });
    } else {
      const user = student || teacher;
      return res.json({
        _id: user._id,
        email: user.email,
        userType: user.userType,
      });
    }
  } catch (error) {
    console.error('Error getting user info', error);
    res.status(500).json({ status: 500, message: 'Error getting user info', error: error.message });
  }
}

module.exports = { getUserInfo };