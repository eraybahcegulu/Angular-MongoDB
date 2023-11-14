const express = require('express');
const router = express.Router();
const studentHome = require('../controllers/student-homeController');

router.get('/students/:studentId/infos', studentHome.getStudentInfos);

router.put('/changePassword/:studentId', studentHome.changePassword);

module.exports = router;