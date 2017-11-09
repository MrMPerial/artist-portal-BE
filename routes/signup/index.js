const router = require('express').Router();

const mongodb = require('../../mongodb.utils');

// Signup Requirements
const addArtist = require('./addArtist');
const addFan = require('./addFan');

// TODO: Add oAuth

// Signup Endpoints //

// Add Artist
router.post('/addArtist', (req, res) => {
  addArtist.addArtist(req);
  res.status(200).send('Successfully added new artist!');
});

// Add Fan
router.post('/addFan', (req, res) => {
  addFan.addFan(req);
  res.status(200).send('Successfully added new fan!');
});

module.exports = router;
