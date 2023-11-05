const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/sendMessage/:studentId', messageController.sendMessage);

router.get('/students/:studentId/messages', messageController.getMessagesForStudent);

router.delete('/deleteMessage/:messageId', messageController.deleteMessage);
module.exports = router;