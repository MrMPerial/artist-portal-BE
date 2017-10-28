const mongodb = require('../mongodb.utils');

mongodb.createEventListeners();
mongodb.connect();

// Profile Requirements
const createArtistProfile = require('./createArtistProfile');
const createFanProfile = require('./createFanProfile');
const updateArtistProfile = require('./updateArtistProfile');
const updateFanProfile = require('./updateFanProfile');

// Profile Endpoints //

// Create Artist Profile
router.post('/createArtistProfile', (req, res) => {
  res.status(200);
});

// Create Fan Profile
router.post('/createFanProfile', (req, res) => {
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
