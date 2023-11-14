const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: String,
  announcement: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Announcement', announcementSchema);