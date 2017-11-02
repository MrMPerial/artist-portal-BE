const router = require('express').Router();

const mongodb = require('../../mongodb.utils');

// Song Requirements
const submitSong = require('./submitSong');
const showAllSongs = require('./showAllSongs');
const searchSong = require('./searchSong');
const updateSong = require('./updateSong');
const deleteSong = require('./deleteSong');

// Song Enpoints //

// Song Submission
router.post('/submitSong', (req, res) => {
  submitSong.submitSong(req);
  res.status(200).send('Song submitted successfully!');
});

// Show All Songs
router.get('/showAllSongs', (req, res) => {
  showAllSongs.showAllSongs();
  res.status(200).json(showAllSongs);
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

module.exports = router;
