const router = require('express').Router();

const mongodb = require('../mongodb.utils');

mongodb.createEventListeners();
mongodb.connect();

// Signup Requirements
const addArtist = require('./addArtist');
const addFan = require('./addFan');

// Signup Endpoints //

// Add Artist
router.post('/addArtist', (req, res) => {
  res.status(200).send(addArtist);
});

// Add Fan
router.post('/addFan', (req, res) => {
  res.status(200);
});

module.exports = router;
