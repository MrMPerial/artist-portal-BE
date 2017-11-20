const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const cloudinary = require('cloudinary');
const formidable = require('formidable');
const http = require('http');

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
app.post('/upload/song', (req, res) => {
  let song = req.body.song;
  cloudinary.v2.uploader.upload(song,
  {resource_type: "video",
  public_id: "{{ username + song title }}"
  },
  (error, result) => {
    if(error) {
      console.log(error);
    }
    console.log(result);
  });
});

let Photo = {
  title      : { type : String, length   : 255 },
  image      : { type : JSON}
};

function uploadImage(req) {
  let photo = new Photo(req.body);
  let imageFile = req.files.image.path;

  cloudinary.v2.uploader.upload(imageFile,
  {public_id: "Cover",
  transformation: [
    {
      width: 300,
      height: 300,
      crop: "scale"
    }
  ]
  })
  .then( (image) => {
    photo.image = image;
    return photo.save();
  })
  .finally( () => {
    res.render('photos/create_through_server', {photo: photo, upload: photo.image});
  });
}

app.post('/upload/image', (req, res) => {
  uploadImage(req);
  res.send('Image Uploaded!')
});

app.listen(3000, () => {
  console.log('Artist Portal is now running on port 3000!');
});
