const express = require('express');
const router = express.Router();
const { getStudents , addStudent , deleteStudent, updateStudent } = require('../controllers/studentController');

router.get('/students', async (req, res) => {
    getStudents(req, res);
  });

router.post('/addStudent', async (req, res) => {
    addStudent(req, res);
});

router.delete('/deleteStudent/:studentId', async (req, res) => {
    deleteStudent(req, res);
});


router.put('/updateStudent/:studentId', async (req, res) => {
    updateStudent(req, res);
  });

module.exports = router;