const router = require('express').Router();

const mongodb = require('../../mongodb.utils');

// Signup Requirements
const addArtist = require('./addArtist');
const addFan = require('./addFan');

// Signup Endpoints //

// Add Artist
router.post('/addArtist', (req, res) => {
  // Test Connection
  addArtist.addArtist(req);
  res.status(200).send(addArtist);
});

// Add Fan
router.post('/addFan', (req, res) => {
  res.status(200);
});

module.exports = router;
