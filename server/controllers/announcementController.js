const announcementUtils = require('../utils/announcementUtils');

async function getAnnouncements(req, res) {
  try {
    const announcements = await announcementUtils.getAnnouncements();
    res.json(announcements);
  } catch (error) {
    console.error('Error getting announcements', error);
    res.status(500).json({ status: 500, message: 'Error getting announcements', error: error.message });
  }
}

async function deleteAnnouncement(req, res) {
  const announcementId = req.params.announcementId;
  try {
    const existingAnnouncement = await announcementUtils.findAnnouncementById(announcementId);

    if (!existingAnnouncement) {
      return res.status(400).json({ message: `Announcement not found.` });
    }
    await announcementUtils.deleteAnnouncementById({ _id: announcementId });

    return res.status(200).json({ message: 'Announcement deleted successfully.' });
  } catch (error) {
    console.error('Error deleting announcement', error);
    res.status(500).json({ message: 'Error deleting announcement', error: error.message });
  }
}

async function createAnnouncement(req, res) {
  const { title, announcement } = req.body;
  try {
    const newAnnouncement = await announcementUtils.createAnnouncement(title, announcement);

    if (newAnnouncement) {
      res.status(200).json({ message: 'Announcement created successfully.' });
    }
  } catch (error) {
    console.error('Error creating announcement', error);
    res.status(500).json({ message: 'Error creating announcement', error: error.message });
  }
}

module.exports = { getAnnouncements, deleteAnnouncement, createAnnouncement };