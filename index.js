const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

const routes = require('./routes');
const mongodb = require('./utils/mongodb.utils');

mongodb.createEventListeners();
mongodb.connect();

const app = express();

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

app.use('/', routes);

app.listen(5000, () => {
  console.log("Artist Portal is now running on port 5000!");
});
