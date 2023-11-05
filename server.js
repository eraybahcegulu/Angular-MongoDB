const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

const db = require('./src/database/db');
db.connect();

app.use(cors());
app.use(bodyParser.json());

const loginRoutes = require('./src/routes/loginRoutes');
const userInfoRoutes = require('./src/routes/userInfoRoutes');
const studentRoutes = require('./src/routes/studentRoutes');
const messageRoutes = require('./src/routes/messageRoutes');


app.use(loginRoutes);
app.use(userInfoRoutes);
app.use(studentRoutes);
app.use(messageRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});