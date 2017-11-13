const router = require('express').Router();

const mongodb = require('../../utils/mongodb.utils');

// User Requirements
const login = require('./login');
const deleteUser = require('./deleteUser');

// User Endpoints //

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
