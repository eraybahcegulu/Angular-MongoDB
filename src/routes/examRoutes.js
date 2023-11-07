const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.get('/exams', examController.getExams);

router.post('/createExam', examController.createExam);

router.delete('/deleteExam/:examId', examController.deleteExam);

module.exports = router;