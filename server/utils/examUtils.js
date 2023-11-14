const Exam = require('../models/exam');

async function getExams() {
    return await Exam.find();
}

async function getExamsForSelectedStudent(studentNo) {
    return await Exam.find({ 'registeredStudents.no': studentNo });
} //öğrencinin kayıtlı her sınavı

async function getScoresForSelectedStudent(studentNo) {
    return await Exam.find({ 'registeredStudents.no': studentNo }, { 'registeredStudents.$': 1 });
} //öğrencinin kayıtlı sınavındaki tek notu

async function findExamByName(name) {
    return await Exam.findOne({ name });
}

async function findExamById(_id) {
    return await Exam.findOne({ _id });
}

async function deleteExamById(_id) {
    return await Exam.deleteOne({ _id });
}

async function createExam(name, date, time, type, questionType, numberOfQuestions, duration) {
    const newExam = new Exam({ name, date, time, type, questionType, numberOfQuestions, duration });
    const savedExam = await newExam.save();
    return savedExam;
}
module.exports = { getExams, getExamsForSelectedStudent, getScoresForSelectedStudent, findExamByName, findExamById, deleteExamById, createExam };