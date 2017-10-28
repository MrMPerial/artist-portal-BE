const router = require('express').Router();

const mongodb = require('../mongodb.utils');

mongodb.createEventListeners();
mongodb.connect();

// User Requirements
const login = require('./login');
const deleteUser = require('./deleteUser');

// User Endpoints //

// User Login
router.get('/login', (req, res) => {
  console.log('login');
  res.status(200).send(login);
});

// Delete User
router.delete('/deleteUser', (req, res) => {
  res.status(200);
});

module.exports = router;
