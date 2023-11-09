const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

const db = require('./src/database/db');
db.connect();

app.use(cors());
app.use(bodyParser.json());

const routes = [
  require('./src/routes/loginRoutes'),
  require('./src/routes/userInfoRoutes'),
  require('./src/routes/studentRoutes'),
  require('./src/routes/messageRoutes'),
  require('./src/routes/examRoutes'),
];

routes.forEach(route => app.use(route));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});