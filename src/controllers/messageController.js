const studentUtils = require('../utils/studentUtils');
const messageUtils = require('../utils/messageUtils');

async function sendMessage(req, res) {
    const studentId = req.params.studentId;
    const { message } = req.body;
    try {
      const existingStudent = await studentUtils.findStudentById(studentId);
  
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
      const student = await studentUtils.findStudentById(studentId);
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
      const existingMessage = await messageUtils.findMessageById(messageId);
  
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

  module.exports = { sendMessage, getMessagesForStudent, deleteMessage };