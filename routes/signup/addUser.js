let User = require('../../models/user.model');
let bcrypt = require('bcrypt');

module.exports = {
  addUser
}

function addUser(req, type) {
  UserSchema.statics.authenticate = (email, password, callback) => {
    User.findOne({ email: email })
    .exec((err, user) => {
      if (err) {
        return callback(err);
      } else if (!user) {
        let err = new Error('User Not Found!');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
  }

  UserSchema.pre('save', (next) => {
    let user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });
}

// function addUser(req, type) {
//   let newUser = new User({
//     email: req.body.email,
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     username: req.body.username,
//     password: req.body.password,
//     profileType: type
//   });
//
//   newUser.save();
// }
