const Student = require('../models/student');
const Teacher = require('../models/teacher');
const jwt = require('jsonwebtoken');

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await findUser(email, password);

    if (user) {
      const token = generateToken(user);
      return res.status(200).json({ message: 'Login successful.', token: token });
    }

    return res.status(401).json();
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ status: 500, message: 'Login failed.' });
  }
}

async function findUser(email, password) {
  const student = await Student.findOne({ email, password });
  if (student) {
    return { _id: student._id, userType: student.userType };
  }

  const teacher = await Teacher.findOne({ email, password });
  if (teacher) {
    return { _id: teacher._id, userType: teacher.userType };
  }

  return null;
}

function generateToken(user) {
  return jwt.sign({ userId: user._id, userType: user.userType }, process.env.JWT_SECRET);
}

module.exports = { loginUser };