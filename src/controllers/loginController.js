const jwtUtils = require('../utils/jwtUtils');
const studentUtils = require('../utils/studentUtils');
const teacherUtils = require('../utils/teacherUtils');


async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await findUser(email, password);

    if (user) {
      const token = jwtUtils.generateToken(user);
      return res.status(200).json({ message: 'Login successful.', token: token });
    }

    return res.status(401).json({message: 'Invalid email or password'});
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ status: 500, message: 'Login failed.' });
  }
}

async function findUser(email, password) {
  const student = await studentUtils.findStudentForLogin(email, password);
  if (student) {
    return { _id: student._id, userType: 'student' };
  }

  const teacher = await teacherUtils.findTeacherForLogin(email, password);
  if (teacher) {
    return { _id: teacher._id, userType: 'teacher' };
  }
  return null;
}







module.exports = { loginUser };