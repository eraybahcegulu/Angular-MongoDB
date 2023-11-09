const express = require('express');
const router = express.Router();
const exam = require('../controllers/examController');

router.get('/exams', exam.getExams);

router.post('/createExam', exam.createExam);

router.delete('/deleteExam/:examId', exam.deleteExam);

router.get('/exams/:examId/students', exam.getStudentsForSelectedExam);

router.post('/registerStudentToExam/:examId', exam.registerStudentToExam);

router.delete('/removeRegisteredStudent/:selectedExamId/:studentNo', exam.removeRegisteredStudent)

module.exports = router;