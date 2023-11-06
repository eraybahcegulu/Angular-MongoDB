

const studentUtils = require('../utils/studentUtils');

async function getStudents(req, res) {
  try {
    const students = await studentUtils.getStudents();
    res.json(students);
  } catch (error) {
    console.error('Error getting students', error);
    res.status(500).json({ status: 500, message: 'Error getting students', error: error.message });
  }
}

async function addStudent(req, res) {
  const { name, surname, email, no, password } = req.body;
  try {
    const studentEmailControl = await studentUtils.findStudentByEmail( email );
    const studentNoControl = await studentUtils.findStudentByNo( no );

    if(studentEmailControl)
    {
      res.status(400).json({ message: `Student Email ${email} is already registered.` });
    }

    else if (studentNoControl) {
      res.status(400).json({ message: `Student No ${no} is already registered.`});
    } 
 
    else {
      const newStudent = await studentUtils.createStudent( name, surname, email, no, password );
      if (newStudent) {
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
    const existingStudent = await studentUtils.findStudentById(studentId);

    if (!existingStudent) {
      return res.status(400).json({ message: 'Student not found.' });
    }
    
    await studentUtils.deleteStudentById({ _id: studentId });
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
    const studentNoControl = await studentUtils.findStudentByNo( no );
    const studentEmailControl = await studentUtils.findStudentByEmail( email );
    const existingStudent = await studentUtils.findStudentById(studentId);

    if (!existingStudent) {
      return res.status(400).json({ message: 'Student not found.' });
    }

    if (studentEmailControl){
      if (studentEmailControl.email !== existingStudent.email) {
        return res.status(400).json({ message: `Update failed for student email ${ existingStudent.email } (${ existingStudent.no }). Student email ${email} is already registered for ${ studentEmailControl.name } ${ studentEmailControl.surname } (${ studentEmailControl.no })` });
      }
    }
    if (studentNoControl) {
      if (studentNoControl.no !== existingStudent.no) {
        return res.status(400).json({ message: `Update failed for student no ${ existingStudent.no } (${ existingStudent.email }). Student no ${email} is already registered for ${ studentNoControl.name } ${ studentNoControl.surname } (${ studentNoControl.email })` });
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