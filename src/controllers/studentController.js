
const Student = require('../models/student');

async function getStudents(req, res) {
    try {
      const students = await Student.find();
      res.json(students);
    } catch (error) {
      console.error('Error getting students', error);
      res.status(500).json({ status: 500, message: 'Error getting students', error: error.message });
    }
  }

async function addStudent(req, res) {
    const { name, surname, email, no, password  } = req.body;
    try {
      const existingStudent = await Student.findOne({ no });
  
      if (existingStudent) {
        res.status(400).json({ message: 'This Student No is already registered.' });
      } else {

        
        const newStudent = new Student({ name, surname, email, no, password });
        const savedStudent = await newStudent.save();
  
        if (savedStudent) {
          res.status(200).json({ message: 'Student added successfully.' });
        }
      }
    } catch (error) {
      console.error('Error adding student', error);
      res.status(500).json({ message: 'Error adding student', error: error.message });
    }
  }

  async function deleteStudent(req, res) {
    const studentId = req.params.studentId;
    
    try {
      const existingStudent = await Student.findById(studentId);
      
      if (!existingStudent) {
        return res.status(400).json({ message: 'Student not found.' });
      }
  
      await Student.deleteOne({ _id: studentId });
      return res.status(200).json({ message: 'Student deleted successfully.' });
    } catch (error) {
      console.error('Error deleting student', error);
      res.status(500).json({ message: 'Error deleting student', error: error.message });
    }
  }

  module.exports = { getStudents , addStudent , deleteStudent};