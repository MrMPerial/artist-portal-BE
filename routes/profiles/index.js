const router = require('express').Router();

const mongodb = require('../../mongodb.utils');

// Profile Requirements
const createProfile = require('./createProfile');
const updateProfile = require('./updateProfile');

// Profile Endpoints //

// Create Artist Profile
router.post('/createArtistProfile', (req, res) => {
  let username = req.body.userName;
  let artistname = req.body.artistName;
  createArtistProfile.createArtistProfile(req, 'Artist', username, artistname);
  res.status(200).send('Artist profile successfully created!');
});

// Create Fan Profile
router.post('/createFanProfile', (req, res) => {
  let username = req.body.userName;
  createFanProfile.createFanProfile(req, 'Fan', username, null);
  res.status(200).send('Fan profile successfully created!');
});

// Update Profile
router.put('/updateProfile', (req, res) => {
  updateArtistProfile.updateProfile(req.body)
  .then((updatedProfile) => {
    res.status(200).send('Profile Updated.');
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

module.exports = router;
