
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
  const { name, surname, email, no, password } = req.body;
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

async function updateStudent(req, res) {
  const studentId = req.params.studentId;

  const { no, email, password, name, surname, midterm, final, absenteeism } = req.body;

  try {
    const studentNoControl = await Student.findOne({ no });
    const existingStudent = await Student.findById(studentId);

    if (!existingStudent) {
      return res.status(400).json({ message: 'Student not found.' });
    }

    if (studentNoControl) {
      if (studentNoControl.no !== existingStudent.no) {
        return res.status(400).json({ message: `Update failed for student no ${ existingStudent.no } (${ existingStudent.email }). Student no ${no} is already registered for ${ studentNoControl.name } ${ studentNoControl.surname } (${ studentNoControl.email })` });
      }
    }

    existingStudent.no = no;
    existingStudent.email = email;
    existingStudent.password = password;
    existingStudent.name = name;
    existingStudent.surname = surname;
    existingStudent.midterm = midterm;
    existingStudent.final = final;
    existingStudent.absenteeism = absenteeism;

    const updatedStudent = await existingStudent.save();

    if (updatedStudent) {
      return res.status(200).json({ message: 'Student updated successfully.' });
    }
  } catch (error) {
    console.error('Error updating student', error);
    res.status(500).json({ message: 'Error updating student', error: error.message });
  }
}

module.exports = { getStudents, addStudent, deleteStudent, updateStudent };