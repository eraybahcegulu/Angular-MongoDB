
const Student = require('../models/student');
const Message = require('../models/student');

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
    const StudentEmailControl = await Student.findOne({ email });
    const studentNoControl = await Student.findOne({ no });

    if(StudentEmailControl)
    {
      res.status(400).json({ message: `Student Email ${email} is already registered.` });
    }

    else if (studentNoControl) {
      res.status(400).json({ message: `Student No ${no} is already registered.`});
    } 
 
    else {
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
    const studentEmailControl = await Student.findOne({ email });
    const existingStudent = await Student.findById(studentId);

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

async function sendMessage(req, res) {
  const studentId = req.params.studentId;
  const { message } = req.body;
  try {
    const existingStudent = await Student.findById(studentId);

    if (!existingStudent) {
      return res.status(400).json({ message: 'Student not found.' });
    }

    existingStudent.messages.push({message: message});
    const savedMessage = await existingStudent.save();

    if (savedMessage) {
      return res.status(200).json({ message: `Your message has been sent to ${existingStudent.email}` });
    }

  } catch (error) {
    console.error('Error sending message', error);
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
}

async function getMessagesForStudent(req, res) {
  const studentId = req.params.studentId;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ status: 404, message: 'Student not found' });
    }

    const messages = student.messages;
    res.json(messages);
  } catch (error) {
    console.error('Error getting messages for student', error);
    res.status(500).json({ status: 500, message: 'Error getting messages for student', error: error.message });
  }
}

async function deleteMessage(req, res) {
  const messageId = req.params.messageId;

  try {
    const existingMessage = await Student.findOne({ 'messages._id': messageId });

    if (!existingMessage) {
      return res.status(400).json({ message: 'Message not found.' });
    }

    existingMessage.messages.pull({ _id: messageId });
    await existingMessage.save();

    return res.status(200).json({ message: 'Message deleted successfully.' });
  } catch (error) {
    console.error('Error deleting message', error);
    res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
}

module.exports = { getStudents, addStudent, deleteStudent, updateStudent , sendMessage, getMessagesForStudent, deleteMessage };