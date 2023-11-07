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

module.exports = { getExams, createExam, deleteExam};