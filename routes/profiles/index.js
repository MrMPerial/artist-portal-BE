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
  res.status(200);
});

// Update Fan Profile
router.put('/updateFanProfile', (req, res) => {
  res.status(200);
});

module.exports = router;
