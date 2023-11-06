const Student = require('../models/student');

async function findMessageById(messageId) {
    return await Student.findOne({ 'messages._id': messageId });
}

module.exports = { findMessageById };
