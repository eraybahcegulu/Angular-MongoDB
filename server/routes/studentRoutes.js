const express = require('express');
const router = express.Router();
const student = require('../controllers/studentController');

router.get('/students', student.getStudents);

router.get('/students/:studentNo/exams', student.getExamsForSelectedStudent);

router.post('/addStudent', student.addStudent);

router.delete('/deleteStudent/:studentId', student.deleteStudent);

router.put('/updateStudent/:studentId', student.updateStudent);

module.exports = router;