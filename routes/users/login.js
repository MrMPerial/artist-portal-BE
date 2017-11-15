let User = require('../../models/user.model');

module.exports = {
  login
}

function login() {
  passport.use(new FacebookStrategy({
      clientID: '1183972921705936',
      clientSecret: 'f8376e4fd45dacf715336a37a8acad89',
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  ));

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
}
