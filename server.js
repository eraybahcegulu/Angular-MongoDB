const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

const db = require('./src/database/db');

const loginUser = require('./src/routes/loginRoutes');
const userRoutes = require('./src/routes/userInfoRoutes');

db.connect();
app.use(cors());
app.use(bodyParser.json());

app.use(loginUser);
app.use(userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});