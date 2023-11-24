const Student = require('../models/student');

async function getStudents() {
    return await Student.find();
}

async function findStudentForLogin(email, password) {
    return await Student.findOne({ email, password });
}

async function findStudentByEmail(email) {
    return await Student.findOne({ email });
}

async function findStudentByNo(no) {
    return await Student.findOne({ no });
}

async function findStudentById(_id) {
    return await Student.findById({ _id });
}

async function findStudentByIdAndUpdate(_id, newStudentData) {
    return await Student.findOneAndUpdate({ _id  }, newStudentData);

}

async function deleteStudentById(_id) {
    return await Student.deleteOne({ _id });
}

async function createStudent(name, surname, email, no, password) {
    const newStudent = new Student({ name, surname, email, no, password });
    const savedStudent = await newStudent.save();
    return savedStudent;
}
module.exports = { getStudents, findStudentForLogin, findStudentByEmail, findStudentByNo, findStudentById, findStudentByIdAndUpdate, deleteStudentById, createStudent };