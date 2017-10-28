const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

const mongodb = require('./mongodb.utils');

mongodb.createEventListeners();
mongodb.connect();

const app = express();

app.use(bodyParser.json());
app.use('/', routes);

app.listen(5000, () => {
  console.log("Artist Portal is now running on port 5000!");
});
