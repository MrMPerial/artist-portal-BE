const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const cloudinary = require('cloudinary');

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
  res.status(200).send('Upload Song Selected!')
});

app.post('/upload/image', (req, res) => {
  let cover = req.body.coverArt;
  cloudinary.v2.uploader.upload(cover,
  {public_id: "Cover",
  transformation: [
    {
      width: 300,
      height: 300,
      crop: "scale"
    }
  ]
  },
  (error, result) => {
    if(error) {
      console.log(error);
      res.status(500).send('Something went wrong while uploading image. Please Try again.')
    }
    console.log(result);
    res.status(200).send('Image uploaded Successfully.')
  });
});

app.listen(3000, () => {
  console.log('Artist Portal is now running on port 3000!');
});
