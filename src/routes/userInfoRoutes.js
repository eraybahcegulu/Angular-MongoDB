const express = require('express');
const router = express.Router();
const userInfo = require('../controllers/userInfoController');

router.get('/user-info', userInfo.getUserInfo);

module.exports = router;