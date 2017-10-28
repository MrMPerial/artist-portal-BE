const router = require('express').Router();

const mongodb = require('../mongodb.utils');
const signup = require('./signup');
const users = require('./users');

mongodb.createEventListeners();
mongodb.connect();

router.get('/', (req, res) => {
  res.status(200).send('Looks like we\'re up and running!');
});

router.use('/signup', signup);
router.use('/users', users);

module.exports = router;
