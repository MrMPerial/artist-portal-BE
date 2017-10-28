const router = require('express').Router();

// Signup Requirements
const addArtist = require('./addArtist');
const addFan = require('./addFan');

// Signup Endpoints

// Add Artist
router.post('/addArtist', (req, res) => {
  res.status(200).send(addArtist);
});

// Add Fan
router.post('/addFan', (req, res) => {
  res.status(200);
});

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

// Create Artist Profile
router.post('/createArtistProfile', (req, res) => {
  res.status(200);
});

// Create Fan Profile
router.post('/createArtistProfile', (req, res) => {
  res.status(200);
});

// Update Artist Profile
router.put('/updateArtistProfile', (req, res) => {
  res.status(200);
});

// Update Fan Profile
router.put('/updateFanProfile', (req, res) => {
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

// Delete User
router.delete('/deleteUser', (req, res) => {
  res.status(200);
});

module.exports = router;
