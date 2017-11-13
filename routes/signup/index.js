const router = require('express').Router();

const mongodb = require('../../mongodb.utils');

// Signup Requirements
const addUser = require('./addUser');

// TODO: Add oAuth

// Signup Endpoints //

// Add Artist
router.post('/addArtist', (req, res) => {
  addUser.addUser(req, 'Artist');
  res.status(200).send('Successfully added new artist!');
});

// Add Fan
router.post('/addFan', (req, res) => {
  addUser.addUser(req, 'Fan');
  res.status(200).send('Successfully added new fan!');
});

module.exports = router;
