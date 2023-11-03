const express = require('express');
const router = express.Router();
const userInfoController= require('../controllers/userInfoController');

router.get('/user-info', userInfoController.getUserInfo);

module.exports = router;