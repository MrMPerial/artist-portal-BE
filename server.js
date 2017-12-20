'use strict';

// === Config === //

// Third party libraries
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const uuidv4 = require('uuid/v4');
const _ = require('lodash');

// Database Configuration
const mongodb = require('./utils/mongodb.utils');

// Mongoose Schemas
const Song = require('./models/song.model');
const User = require('./models/user.model');

// Database connectivity
mongodb.createEventListeners();
mongodb.connect();

// Third party server configuration
cloudinary.config({
  cloud_name: 'mperial-web-solutions',
  api_key: '938561814326735',
  api_secret: 'QPUJetWRNBfDEjfIcZUnXCft6vM'
});

// Facebook Login Integration
passport.use(new Strategy({
  clientID: '1183972921705936',
  clientSecret: 'f8376e4fd45dacf715336a37a8acad89',
  callbackURL: 'http://localhost:3000/login/facebook/return'
}, (accessToken, refreshToken, profile, cb) => {
  return cb(null, profile);
}));

// Serialize user for login caching
passport.serializeUser( (user, cb) => {
  cb(null, user);
});

// Deserialize user after logout
passport.deserializeUser( (obj, cb) => {
  cb(null, obj);
});

// Express Framework
const app = express();

// Front End placeholder using EJS
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Needed to upload files from a form
app.use(fileUpload());

// Needed for user login sessions
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'ap secret', resave: true, saveUninitialized: true }));

// Needed for user login sessions
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

// After authenticating a user with Facebook,
// check to see if the user already exists in the database.
// If user does not exist, send the user to a profile prompt to determine type of user.
// If user exists, send the user to the profile page.
app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    User.findOne({ 'userID': req.user.id })
    .then((findUser) => {
      if (!findUser) {
        res.render('profile-select');
      } else {
        res.redirect('/');
      }
    })
    .catch((error) => {
      res.status(500).send('Something went wrong, please go back and try again.');
    });
});

// When directed to the profile, check if user exists.
// If user does not exist, add them to the database.
// If user exists, check user type.
// If user has type "fan", direct the user to fanProfile page.
// If user has type "artist", direct user to artistProfile page.
app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
  let proType = req.query.userType;

  addUser(req, proType)
  .then(() => {
    User.findOne({ 'userID': req.user.id }, (error, user) => {
      if (user.profileType == 'fan') {
        getAllByLiked(req)
        .then((result) => {
          let songs = _.flatten(result);
          res.render('fanProfile', { user: req.user, songs: songs });
        })
        .catch((error) => {
          res.status(500).send('Something went wrong, please go back and try again.');
        });
      } else if (user.profileType == 'artist') {
        getAllByArtist(req)
        .then((result) => {
          res.render('artistProfile', { user: req.user, songs: result });
        })
        .catch((error) => {
          res.status(500).send('Something went wrong, please go back and try again.');
        });
      }
    })
  })
});

// Search the database and return all existing songs.
app.get('/discover', (req, res) => {
  let user = req.user;

  getAll()
  .then((result) => {
    res.render('discover', { songs: result, user: user });
  })
  .catch((error) => {
    res.status(500).send('Something went wrong, please go back and try again.');
  });
});

// Upload audio file to server.
// Upload image file to server.
// Add data to database.
// Direct User to success page.
app.post('/uploadNewSong', (req, res) => {
  let user = req.user.id;
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
    return addToDB(title, cloudinaryImageID, cloudinarySongID, user);
  })
  .then(() => {
    res.status(200).render('success');
  })
  .catch((error) => {
    res.status(500).send('Something went wrong, please go back and try again.').end()
  });
});

// Check to see if song is already liked by fan.
// If song is not liked by fan add audio ID to fan song list.
// If song is not liked by fan increase number of likes by 1 for that song.
// If song is already liked by fan, do nothing.
app.post('/likeSong', (req, res) => {
  let newLike = req.body.id;

  addLikeToProfile(req, newLike);
  addLike(req, newLike)
  .then(() => {
    res.status(200).redirect('discover');
  })
  .catch((error) => {
    res.status(500).send('Something went wrong, please go back and try again.');
  });
});

// Create server on port.
app.listen(8080, () => {
  console.log('Artist Portal is now running on port 3000!');
});

// === Functions === //

// Search and return all songs in the database in order of highest to lowest likes.
function getAll() {
  return Song.find({})
  .then((allSongs) => {
    return _.sortBy(allSongs, ['numberOfLikes']).reverse();
  })
}

// Search and return all songs uploaded by artist.
function getAllByArtist(req) {
  return Song.find({ "artist": req.user.id });
}

// Search and return list of songs liked by user.
function getAllByLiked(req) {
  let songList = [];
  return User.findOne({ "userID": req.user.id })
  .then((result) => {
    for ( let i = 0; i < result.songLikes.length; i++ ) {
      songList.push(Song.find({ "audioID": result.songLikes[i] }));
    }
    return Promise.all(songList);
  })
  .catch((error) => {
    console.log(error);
  });
}

// Check if song has been liked by user.
// If new user like, add song to user list.
function addLikeToProfile(req, newLike) {
  return User.findOne({ "userID": req.user.id }, (error, change) => {
    for ( let i = 0; i < change.songLikes.length; i++ ) {
      if (change.songLikes[i] == newLike) {
        return;
      }
    }
    change.songLikes.push(newLike);
    change.save();
  })
}

// Check if song has been liked by user.
// If new user like, increase number of likes by 1.
function addLike(req, newLike) {
  return User.findOne({ "userID": req.user.id }, (error, user) => {
    for ( let i = 0; i < user.songLikes.length; i++ ) {
      if (user.songLikes[i] == newLike) {
        return;
      }
    }
    return Song.findOne({ "audioID": newLike }, (error, change) => {
      change.numberOfLikes = change.numberOfLikes + 1;
      change.save();
    });
  })
}

// Check if user exists.
// If new user add user to database.
function addUser(req, type) {
  return User.findOne({ 'userID': req.user.id })
  .then((findUser) => {
    if (!findUser) {
      let newUser = new User({
        userID: req.user.id,
        userName: req.user.displayName,
        songLikes: [],
        profileType: type
      });

      return newUser.save();
    }
  })
  .catch((error) => {
    console.log(error);
  });
}

// Add data to database.
function addToDB(title, cloudinaryImageID, cloudinarySongID, user) {
  let userID = user;
  let songID = title;
  let image = cloudinaryImageID;
  let song = cloudinarySongID;

  let newSong = new Song({
    artist: userID,
    imageID: image,
    audioID: song,
    title: songID,
    downloadable: true,
    streamable: true,
    numberOfLikes: 0
  });

  return newSong.save();
}

// Upload image to server.
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

// Upload song file to server.
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

// TODO: Create option to delete songs and profiles.
// TODO: Create A&R Profile with ability to see top 10 artist and the artist contact info.
// TODO: Clean up.
// TODO: Separate files into cleaner structure.
// TODO: Create error pages.
