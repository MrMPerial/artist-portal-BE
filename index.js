const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const mongodb = require('./utils/mongodb.utils');

mongodb.createEventListeners();
mongodb.connect();

const app = express();

app.use('/', routes);

app.listen(5000, () => {
  console.log("Artist Portal is now running on port 5000!");
});
