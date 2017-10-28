const mongodb = require('../mongodb.utils');

mongodb.createEventListeners();
mongodb.connect();

// Song Requirements
const submitSong = require('./submitSong');
const showAllSongs = require('./showAllSongs');
const searchSong = require('./searchSong');
const updateSong = require('./updateSong');
const deleteSong = require('./deleteSong');

// Song Enpoints //

// Song Submission
router.post('/submitSong', (req, res) => {
  res.status(200);
});

// Show All Songs
router.get('/showAllSongs', (req, res) => {
  res.status(200);
});

// Search Song
router.get('/searchSong', (req, res) => {
  res.status(200);
});

// Update Song
router.put('/updateSong', (req, res) => {
  res.status(200);
});

// Delete Song
router.delete('/deleteSong', (req, res) => {
  res.status(200);
});