const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.get('/exams', examController.getExams);

router.post('/createExam', examController.createExam);

router.delete('/deleteExam/:examId', examController.deleteExam);

router.get('/exams/:examId/students', examController.getStudentsForSelectedExam);

router.post('/registerStudentToExam/:examId', examController.registerStudentToExam);

router.delete('/removeRegisteredStudent/:selectedExamId/:studentNo', examController.removeRegisteredStudent)

module.exports = router;