'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const uuidv4 = require('uuid/v4');

cloudinary.config({
  cloud_name: 'mperial-web-solutions',
  api_key: '938561814326735',
  api_secret: 'QPUJetWRNBfDEjfIcZUnXCft6vM'
});

passport.use(new Strategy({
  clientID: '1183972921705936',
  clientSecret: 'f8376e4fd45dacf715336a37a8acad89',
  callbackURL: 'http://localhost:3000/login/facebook/return'
}, (accessToken, refreshToken, profile, cb) => {
  return cb(null, profile);
}));

passport.serializeUser( (user, cb) => {
  cb(null, user);
});

passport.deserializeUser( (obj, cb) => {
  cb(null, obj);
});

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(fileUpload());

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'ap secret', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

// Login Routes
app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/login/facebook',
  passport.authenticate('facebook')
);

app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
  res.render('profile', { user: req.user });
});

// Upload Routes -- Use Cloudinary
app.post('/uploadNewSong', (req, res) => {
  let title = req.body.title;
  let image = req.files.coverArt;
  let song = req.files.audio;
  let cloudinaryImageID = uuidv4();
  let cloudinarySongID = uuidv4();

  // Use promises to add song then image and finally database
  uploadSong(song, cloudinarySongID);
  uploadImage(image, cloudinaryImageID);
  addToDB(title, cloudinaryImageID, cloudinarySongID);
  res.status(200).send('Files uploaded!');

  // Add to mlab database
  function addToDB(title, cloudinaryImageID, cloudinarySongID) {
    let songID = title;
    let image = cloudinaryImageID;
    let song = cloudinarySongID;
  }

  // Add to image cloudinary
  function uploadImage(image, cloudinaryImageID) {
    cloudinary.v2.uploader.upload_stream(
    { public_id: cloudinaryImageID,
    transformation: [
      {
        width: 300,
        height: 300,
        crop: 'scale'
      }
    ]
  }, (error, result) => {
      if(error) {
        console.log(error);
        res.status(500).send('Something went wrong while uploading image. Please Try again.')
      }
      console.log(result);
      res.status(200).send('Image uploaded Successfully.')
    }).end(image.data);
  }

  // Add to mp3 cloudinary
  function uploadSong(song, cloudinarySongID) {
    cloudinary.v2.uploader.upload_stream(
      { resource_type: "video",
      public_id: cloudinarySongID
      }, (error, result) => {
      if(error) {
        console.log(error);
        res.status(500).send('Something went wrong while uploading image. Please Try again.')
      }
      console.log(result);
      res.status(200).send('Song uploaded Successfully.')
    }).end(song.data);
  }

  // Return to profile when finished

});

app.listen(3000, () => {
  console.log('Artist Portal is now running on port 3000!');
});

// To access the image for display --->
// cloudinary.image(cloudinaryImageID, { format: 'png' });
