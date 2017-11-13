const GitHubStrategy = require('passport-github2').Strategy;

const User = require('../models/user.model');

const githubAuth = {
  clientID: '954fde25db7d93ce975d',
  clientSecret: 'ec38041d22b22e6f274b46eb9865f26e21e96f31',
  callbackURL: 'http://localhost:3000/login/callback'
};

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  passport.use(new GitHubStrategy(githubAuth, findOrCreateUser));

  function findOrCreateUser (accessToken, refreshToken, profile, done) {
    const query = { 'github.id': profile.id };
    const updates = {
      $setOnInsert: {
        'github.username': profile.username,
        'github.publicRepos': profile._json.public_repos
      }
    };
    const options = { upsert: true, new: true };

    return User.findOneAndUpdate(query, updates, options)
      .then((result) => {
        return done(null, result);
      })
      .catch((err) => {
        return done(err, null);
      });
  }
};

////////////////////////////////////////////////////////////////

// let LocalStrategy = require('passport-local').Strategy;
// let FacebookStrategy = require('passport-facebook').Strategy;
//
// let User = require('../models/user.model');
// let configAuth = require('./auth');
//
// module.exports = function(passport) {
//
//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
//
//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });
//
//   passport.use(new FacebookStrategy({
//     clientID: configAuth.facebookAuth.clientID,
//     clientSecret: configAuth.facebookAuth.clientSecret,
//     callbackURL: configAuth.facebookAuth.callbackURL
//   },
//   function(token, refreshToken, profile, done) {
//     process.nextTick(function() {
//       User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
//         if (err)
//           return done(err);
//         if (user) {
//           return done(null, user);
//         } else {
//           var newUser = new User();
//             newUser.facebook.id    = profile.id;
//             newUser.facebook.token = token;
//             newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
//             newUser.facebook.email = profile.emails[0].value;
//             newUser.save(function(err) {
//               if (err)
//                 throw err;
//               return done(null, newUser);
//             });
//         }
//       });
//     });
//   }));
// };
