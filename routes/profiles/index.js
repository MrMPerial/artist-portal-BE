const router = require('express').Router();

const mongodb = require('../../mongodb.utils');

// Profile Requirements
const createArtistProfile = require('./createArtistProfile');
const createFanProfile = require('./createFanProfile');
const updateArtistProfile = require('./updateArtistProfile');
const updateFanProfile = require('./updateFanProfile');

// Profile Endpoints //

// Create Artist Profile
router.post('/createArtistProfile', (req, res) => {
  createArtistProfile.createArtistProfile(req);
  res.status(200).send('Artist profile successfully created!');
});

// Create Fan Profile
router.post('/createFanProfile', (req, res) => {
  createFanProfile.createFanProfile(req);
  res.status(200).send('Fan profile successfully created!');
});

// Update Artist Profile
router.put('/updateArtistProfile', (req, res) => {
  updateArtistProfile.updateArtistProfile(req.body)
  .then((updatedArtistProfile) => {
    res.status(200).send('Artist Profile Updated.');
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

// Update Fan Profile
router.put('/updateFanProfile', (req, res) => {
  updateFanProfile.updateFanProfile(req.body)
  .then((updatedFanProfile) => {
    res.status(200).send('Fan Profile Updated.');
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

module.exports = router;
