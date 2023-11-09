const examUtils = require('../utils/examUtils');

async function getExams(req, res) {
  try {
    const exams = await examUtils.getExams();
    res.json(exams);
  } catch (error) {
    console.error('Error getting exams', error);
    res.status(500).json({ status: 500, message: 'Error getting exams', error: error.message });
  }
}

async function createExam(req, res) {
  const { name, date, time, type, questionType, numberOfQuestions, duration } = req.body;
  try {
    const examNameControl = await examUtils.findExamByName( name );

    if(examNameControl)
    {
      res.status(400).json({ message: `${name} exam has already been created.` });
    }
 
    else {
      const newExam = await examUtils.createExam( name, date, time, type, questionType, numberOfQuestions, duration  );
      if (newExam) {
        res.status(200).json({ message: 'Exam created successfully.' });
      }
    }
  } catch (error) {
    console.error('Error creating exam', error);
    res.status(500).json({ message: 'Error creating exam', error: error.message });
  }
}

async function deleteExam(req, res) {
  const examId = req.params.examId;

  try {
    const existingExam = await examUtils.findExamById(examId);

    if (!existingExam) {
      return res.status(400).json({ message: `Exam not found.` });
    }

    await examUtils.deleteExamById({ _id: examId });

    return res.status(200).json({ message: 'Exam deleted successfully.' });
  } catch (error) {
    console.error('Error deleting exam', error);
    res.status(500).json({ message: 'Error deleting exam', error: error.message });
  }
}

async function getStudentsForSelectedExam(req, res) {
  const examId = req.params.examId;

  try {
    const exam = await examUtils.findExamById(examId);
    if (!exam) {
      return res.status(404).json({ status: 404, message: 'Exam not found' });
    }

    const students = exam.registeredStudents;
    res.json(students);
  } catch (error) {
    console.error('Error getting messages for student', error);
    res.status(500).json({ status: 500, message: 'Error getting messages for student', error: error.message });
  }
}

async function registerStudentToExam(req, res) {
  const examId = req.params.examId;
  const { studentNo } = req.body;

  try {
    const existingExam = await examUtils.findExamById(examId);

    if (!existingExam) {
      return res.status(400).json({ message: 'Exam not found.' });
    }

    const isStudentAlreadyRegistered = existingExam.registeredStudents.some(registeredStudent => registeredStudent.no === studentNo);

    if (isStudentAlreadyRegistered) {
      return res.status(400).json({ message: `Student number ${studentNo} is already registered for this exam.` });
    }
    
    existingExam.registeredStudents.push({no: studentNo});
    const registeredStudent = await existingExam.save();

    if (registeredStudent) {
      return res.status(200).json({ message: `Registered number ${studentNo} student to this exam.` });
    }

  } catch (error) {
    console.error('Error sending message', error);
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
}

async function removeRegisteredStudent(req, res) {
  const studentNo = req.params.studentNo;
  const selectedExamId = req.params.selectedExamId;

  try {
    const existingExam = await examUtils.findExamById(selectedExamId);


    if (!existingExam) {
      return res.status(400).json({ message: 'Exam not found.' });
    }

    existingExam.registeredStudents.pull({ no: studentNo });
    await existingExam.save();

    return res.status(200).json({ message: 'Student removed from the exam successfully.' });
  } catch (error) {
    console.error('Error removing student from the exam', error);
    res.status(500).json({ message: 'Error removing student from the exam', error: error.message });
  }
}

module.exports = { getExams, createExam, deleteExam , getStudentsForSelectedExam, registerStudentToExam, removeRegisteredStudent};