let User = require('../../models/user.model');

module.exports = {
  addFan
}

function addFan(req) {
  let newFan = new User({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    profileType: 'fan'
  });

  newFan.save();
}
