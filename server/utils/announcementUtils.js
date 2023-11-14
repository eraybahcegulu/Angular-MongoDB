const Announcement = require('../models/announcement');


async function getAnnouncements() {
    return await Announcement.find();
}

async function findAnnouncementById(_id) {
    return await Announcement.findOne({ _id });
}

async function deleteAnnouncementById(_id) {
    return await Announcement.deleteOne({ _id });
}


async function createAnnouncement(title, announcement) {
    const newAnnouncement = new Announcement({ title, announcement });
    const savedAnnouncement = await newAnnouncement.save();
    return savedAnnouncement;
}

module.exports = { createAnnouncement, findAnnouncementById, deleteAnnouncementById, getAnnouncements };