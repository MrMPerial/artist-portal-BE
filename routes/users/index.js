const router = require('express').Router();

const mongodb = require('../../utils/mongodb.utils');

const login = require('./login');
const deleteUser = require('./deleteUser');
const addUser = require('./addUser');

// User Endpoints //

// TODO: Add oAuth

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

// User Login
router.get('/login', (req, res) => {
  login.login(req.body)
  .then((userToValidate) => {
    if(isValidUser === true) {
      res.status(200).send(isValidUser);
    } else {
      res.status(404).send('User Not Found!');
    }
  })
  .catch((err) => {
    res.status(500).send(err);
  });
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
