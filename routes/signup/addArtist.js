let User = require('../../models/user.model');

module.exports = {
  addArtist
}

function addArtist(req) {
  let newArtist = new User({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    profileType: 'artist'
  });

  newArtist.save();
}
