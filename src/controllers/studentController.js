const studentUtils = require('../utils/studentUtils');
const examUtils = require('../utils/examUtils');

async function getStudents(req, res) {
  try {
    const students = await studentUtils.getStudents();
    res.json(students);
  } catch (error) {
    console.error('Error getting students', error);
    res.status(500).json({ status: 500, message: 'Error getting students', error: error.message });
  }
}


async function getExamsForSelectedStudent(req, res) {
  const studentNo = req.params.studentNo;

  try {
    const existingStudent = await studentUtils.findStudentByNo(studentNo);
    if (!existingStudent) {
      return res.status(404).json({ status: 404, message: 'Student not found' });
    }

    const registeredExams = await examUtils.getExamsForSelectedStudent(studentNo);
    const registeredExamsScores = await examUtils.getScoresForSelectedStudent(studentNo);
    
    const examsWithScores = registeredExams.map((exam) => {
      const matchingScore = registeredExamsScores.find((score) => score._id.equals(exam._id)); 
      const score = matchingScore.registeredStudents[0].score;

      return {
        ...exam.toObject(),
        score
      };
    });

    console.log(examsWithScores)

    res.json( examsWithScores );
     
  } catch (error) {
    console.error('Error getting exams for student', error);
    res.status(500).json({ status: 500, message: 'Error getting exams for student', error: error.message });
  }
}


async function addStudent(req, res) {
  const { name, surname, email, no, password } = req.body;
  try {
    const studentEmailControl = await studentUtils.findStudentByEmail(email);
    const studentNoControl = await studentUtils.findStudentByNo(no);

    if (studentEmailControl) {
      res.status(400).json({ message: `Student Email ${email} is already registered.` });
    }

    else if (studentNoControl) {
      res.status(400).json({ message: `Student No ${no} is already registered.` });
    }

    else {
      const newStudent = await studentUtils.createStudent(name, surname, email, no, password);
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

    const studentNo = existingStudent.no;
    const exams = await examUtils.getExams();

    for (const exam of exams) {
      exam.registeredStudents = exam.registeredStudents.filter(
        (registeredStudent) => registeredStudent.no !== studentNo
      );
      await exam.save();
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

  const { no, email, password, name, surname, absenteeism } = req.body;

  try {
    const studentNoControl = await studentUtils.findStudentByNo(no);
    const studentEmailControl = await studentUtils.findStudentByEmail(email);
    const existingStudent = await studentUtils.findStudentById(studentId);

    if (!existingStudent) {
      return res.status(400).json({ message: 'Student not found.' });
    }

    if (studentEmailControl) {
      if (studentEmailControl.email !== existingStudent.email) {
        return res.status(400).json({ message: `Update failed for student email ${existingStudent.email} (${existingStudent.no}). Student email ${email} is already registered for ${studentEmailControl.name} ${studentEmailControl.surname} (${studentEmailControl.no})` });
      }
    }
    if (studentNoControl) {
      if (studentNoControl.no !== existingStudent.no) {
        return res.status(400).json({ message: `Update failed for student no ${existingStudent.no} (${existingStudent.email}). Student no ${email} is already registered for ${studentNoControl.name} ${studentNoControl.surname} (${studentNoControl.email})` });
      }
    }


    
    let controlRegisteredExams = false;
    let registeredExamsNames = [];

    const exams = await examUtils.getExams();

    for (const exam of exams) {
      for (const registeredStudent of exam.registeredStudents) {
        if (registeredStudent.no === existingStudent.no) {
          registeredStudent.no = no;
          controlRegisteredExams = true;
          registeredExamsNames.push(`${exam.name} ${exam.type}`);
        }
      }
      await exam.save();
    }

    existingStudent.no = no;
    existingStudent.email = email;
    existingStudent.password = password;
    existingStudent.name = name;
    existingStudent.surname = surname;
    existingStudent.absenteeism = absenteeism;

    const updatedStudent = await existingStudent.save();

    if (updatedStudent) {
      if(controlRegisteredExams)
      {
        return res.status(200).json({ message: `Student updated successfully. Registered information for exams found and has been updated. (${registeredExamsNames})` });
      }
      return res.status(200).json({ message: 'Student updated successfully.' });
    }
  } catch (error) {
    console.error('Error updating student', error);
    res.status(500).json({ message: 'Error updating student', error: error.message });
  }
}



module.exports = { getStudents, getExamsForSelectedStudent, addStudent, deleteStudent, updateStudent };