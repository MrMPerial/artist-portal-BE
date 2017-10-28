let User = require('../../models/user.model');

module.exports = {
  addArtist
}

function addArtist(req) {
  console.log('Add Artist Function');
  // Test Connection
  let newArtist = new User({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password
  });

  newArtist.save();
}
