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
  showAllSongs.showAllSongs()
  .then((songsFetched) => {
    res.status(200).send(songsFetched);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

// Search Song
router.get('/searchSong', (req, res) => {
  searchSong.searchSong(req.query.title)
  .then((songFetched) => {
    res.status(200).send(songFetched);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

// Update Song
router.put('/updateSong', (req, res) => {
  res.status(200);
});

// Delete Song
router.delete('/deleteSong', (req, res) => {
  deleteSong.deleteSong(req.query.title)
  .then((songToDelete) => {
    res.status(200).send('Your song has been deleted.');
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

module.exports = router;
