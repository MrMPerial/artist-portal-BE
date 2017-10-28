const router = require('express').Router();
const addArtist = require('./addArtist');
const addFan = require('./addFan');

router.get('/addArtist', (req, res) => {
  console.log('artist');
  res.status(200).send(addArtist);
});

router.get('/addFan', (req, res) => {
  console.log('fan');
  res.status(200).send(addFan);
});

module.exports = router;
