const router = require('express').Router();
const isLoggedIn = require('../../middleware/is-logged-in.mw');

const mongodb = require('../../utils/mongodb.utils');

// Signup Requirements
const addUser = require('./addUser');

// TODO: Add oAuth

module.exports = function (passport) {
  var router = require('express').Router();

  router.get('/', (req, res) => {
    res.status(200).sendFile(process.cwd() + '/assets/index.html');
  });

  router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

  router.get(
    '/login/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => { res.redirect('/secrets');
  });

  router.get('/secrets', isLoggedIn, function (req, res) {
    res.status(200).sendFile(process.cwd() + '/assets/secrets.html');
  });

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  return router;
};

// Signup Endpoints //

// // Add Artist
// router.post('/addArtist', (req, res) => {
//   addUser.addUser(req, 'Artist');
//   res.status(200).send('Successfully added new artist!');
// });
//
// // Add Fan
// router.post('/addFan', (req, res) => {
//   addUser.addUser(req, 'Fan');
//   res.status(200).send('Successfully added new fan!');
// });

module.exports = router;
