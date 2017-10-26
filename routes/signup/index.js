const router = require('express').Router();
const addArtist = require('./addArtist');

router.get('/addArtist', (req, res) => {
  console.log('Connected');
});

module.exports = router;
