const studentUtils = require('../utils/studentUtils');

async function getStudentInfos(req, res) {
    const studentId = req.params.studentId;

    try {
        const student = await studentUtils.findStudentById(studentId)
        if (!student) {
            return res.status(404).json({ status: 404, message: 'Student not found' });
        }

        const studentInfos = student;
        res.json(studentInfos);
    } catch (error) {
        console.error('Error getting student infos', error);
        res.status(500).json({ status: 500, message: 'Error getting student infos', error: error.message });
    }
}

async function changePassword(req, res) {
    const studentId = req.params.studentId;

    const { password } = req.body;

    try {
        const existingStudent = await studentUtils.findStudentById(studentId);

        if (!existingStudent) {
            return res.status(400).json({ message: 'Your account was not found' });
        }

        if (existingStudent.password === password) {
            return res.status(400).json({ message: 'This password is the same as your old password' });
        }

        existingStudent.password = password;
        const changedPassword = await existingStudent.save();

        if (changedPassword) {
            return res.status(200).json({ message: `Changed password successfully. Your new password is: ${password}` });
        }

    } catch (error) {
        console.error('Error change password', error);
        res.status(500).json({ message: 'Error changed password', error: error.message });
    }
}


module.exports = { getStudentInfos, changePassword };