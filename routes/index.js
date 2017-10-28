const router = require('express').Router();

const signup = require('./signup');
const users = require('./users');
const profiles = require('./profiles');
const songs = require('./songs');

router.get('/', (req, res) => {
  res.status(200).send('Looks like we\'re up and running!');
});

router.use('/signup', signup);
router.use('/users', users);
router.use('/profiles', profiles);
router.use('/songs', songs);

module.exports = router;
