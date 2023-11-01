const express = require('express');
const router = express.Router();
const { getUserInfo } = require('../controllers/userInfoController');

router.get('/user-info', async (req, res) => {
  getUserInfo(req, res);
});

module.exports = router;