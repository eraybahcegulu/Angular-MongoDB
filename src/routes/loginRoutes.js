const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/loginController');

router.post('/login', async (req, res) => {
  loginUser(req, res);
});

module.exports = router;