const Exam = require('../models/exam');

async function getExams() {
    return await Exam.find();
}

async function findExamByName(name) {
    return await Exam.findOne({ name });
}

async function findExamById( _id ) {
    return await Exam.findOne({ _id });
}

async function deleteExamById( _id ) {
    return await Exam.deleteOne({ _id });
}

async function createExam( name, date, time, type, questionType, numberOfQuestions, duration ) {
    const newExam = new Exam({ name, date, time, type, questionType, numberOfQuestions, duration });
    const savedExam = await newExam.save();
    return savedExam;
}
module.exports = { getExams, findExamByName, findExamById, deleteExamById, createExam };