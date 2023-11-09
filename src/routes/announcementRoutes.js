const express = require('express');
const router = express.Router();
const announcement = require('../controllers/announcementController');

router.get('/announcements', announcement.getAnnouncements);

router.delete('/deleteAnnouncement/:announcementId', announcement.deleteAnnouncement);

router.post('/createAnnouncement', announcement.createAnnouncement);

module.exports = router;