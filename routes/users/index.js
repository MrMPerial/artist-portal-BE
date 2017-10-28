const router = require('express').Router();

// Login Requirements
const login = require('./login');

// Login Endpoints

// User Login
router.get('/login', (req, res) => {
  console.log('login');
  res.status(200).send(login);
});

module.exports = router;
