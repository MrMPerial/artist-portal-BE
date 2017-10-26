const express = require('express');
const routes = require('./routes');
const bodyParer = require('body-parser');

const app = express();

app.use(bodyParer.json());
app.use('/', routes);

app.listen(5000, () => {
  console.log("Artist Portal is now running on port 5000!");
});
