const router = require('express').Router();

const mongodb = require('../../mongodb.utils');

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
  deleteUser.deleteUser(req.query.id)
  .then((userToDelete) => {
    res.status(200).send('User has been deleted.')
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

module.exports = router;
