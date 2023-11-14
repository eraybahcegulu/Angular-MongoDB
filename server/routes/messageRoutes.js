const express = require('express');
const router = express.Router();
const message = require('../controllers/messageController');

router.post('/sendMessage/:studentId', message.sendMessage);

router.get('/students/:studentId/messages', message.getMessagesForStudent);

router.delete('/deleteMessage/:messageId', message.deleteMessage);

module.exports = router;