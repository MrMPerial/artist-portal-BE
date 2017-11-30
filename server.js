'use strict';

// === Config === //

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const uuidv4 = require('uuid/v4');

const mongodb = require('./utils/mongodb.utils');

mongodb.createEventListeners();
mongodb.connect();

let Song = require('./models/song.model');

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

// === Endpoints === //

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

// Upload Routes
app.post('/uploadNewSong', (req, res) => {
  let title = req.body.title;
  let image = req.files.coverArt;
  let song = req.files.audio;
  let cloudinaryImageID = uuidv4();
  let cloudinarySongID = uuidv4();

  uploadSong(song, cloudinarySongID)
  .then(() => {
    return uploadImage(image, cloudinaryImageID);
  })
  .then(() => {
    return addToDB(title, cloudinaryImageID, cloudinarySongID);
  })
  .then(() => {
    res.status(200).render('/success', { message: 'Your song was successfully uploaded!' });
    // res.status(200).send('Files uploaded!');
    // Return to profile page
  })
  .catch((error) => {
    res.status(500).send('Something went wrong. Please go back and try again.').end()
  });
});

app.listen(3000, () => {
  console.log('Artist Portal is now running on port 3000!');
});

// === Functions === //

function addToDB(title, cloudinaryImageID, cloudinarySongID) {
  let songID = title;
  let image = cloudinaryImageID;
  let song = cloudinarySongID;

  let newSong = new Song({
    // Get user ID from FB to use as artist ID
    // artist: user.id,
    imageID: image,
    audioID: song,
    title: songID,
    downloadable: true,
    streamable: true,
    numberOfLikes: 0
  });

  return newSong.save();

}

function uploadImage(image, cloudinaryImageID) {
  return new Promise((resolve, reject) => {
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
      }
    }).end(image.data);
    resolve();
  });

}

function uploadSong(song, cloudinarySongID) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream(
      { resource_type: "video",
      public_id: cloudinarySongID
      }, (error, result) => {
      if(error) {
        console.log(error);
      }
    }).end(song.data);
    resolve();
  });

}

// To access the image for display --->
// cloudinary.image(cloudinaryImageID, { format: 'png' });
