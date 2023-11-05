const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/students', studentController.getStudents);

router.post('/addStudent', studentController.addStudent);

router.delete('/deleteStudent/:studentId', studentController.deleteStudent);

router.post('/sendMessage/:studentId', studentController.sendMessage);

router.put('/updateStudent/:studentId', studentController.updateStudent);

router.get('/students/:studentId/messages', studentController.getMessagesForStudent);

router.delete('/deleteMessage/:messageId', studentController.deleteMessage);
module.exports = router;