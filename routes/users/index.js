const router = require('express').Router();
const passport = require('passport');

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
router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

  router.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

router.get('/login',
  function(req, res){
    res.render('login');
  });

router.get('/login/facebook',
  passport.authenticate('facebook'));

router.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
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
