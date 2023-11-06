const jwt = require('jsonwebtoken');

function generateToken(user) {
    return jwt.sign({ userId: user._id, userType: user.userType }, process.env.JWT_SECRET);
  }

module.exports = { generateToken };