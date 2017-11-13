const router = require('express').Router();

const mongodb = require('../../utils/mongodb.utils');

// Song Requirements
const submitSong = require('./submitSong');
const showAllSongs = require('./showAllSongs');
const searchSong = require('./searchSong');
const updateSong = require('./updateSong');
const deleteSong = require('./deleteSong');

// TODO: Add endpoints for song download and stream

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
  updateSong.updateSong(req.body)
  .then((songToUpdate) => {
    res.status(200).send('Your song has been updated.');
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

// Delete Song
router.delete('/deleteSong', (req, res) => {
  deleteSong.deleteSong(req.query.id)
  .then((songToDelete) => {
    res.status(200).send('Your song has been deleted.');
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

module.exports = router;
