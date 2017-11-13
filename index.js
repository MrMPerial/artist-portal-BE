const express = require('express');
// const routes = require('./routes');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

const routes = require('./routes')(passport);
const configPassport = require('./configs/passport.config');
const mongodb = require('./mongodb.utils');

mongodb.createEventListeners();
mongodb.connect();

configPassport(passport);
const app = express();

app.use(session({ secret: 'menagerie of monkeys', resave: false, saveUninitialized: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/assets', express.static(process.cwd() + '/assets'));
app.use('/', routes);

app.listen(5000, () => {
  console.log("Artist Portal is now running on port 5000!");
});
