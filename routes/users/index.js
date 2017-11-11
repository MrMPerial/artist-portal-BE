const router = require('express').Router();

const mongodb = require('../../mongodb.utils');

// User Requirements
const login = require('./login');
const deleteUser = require('./deleteUser');

// User Endpoints //

// User Login
///////////////////////////////////////////

// router.post('/login', (req, res, next) => {
//   if (req.body.password !== req.body.passwordConfirm) {
//     let err = new Error('Passwords do not match!');
//     err.status = 400;
//     res.send('Passwords do not match!');
//     return next(err);
//   }
//
//   if (req.body.email && req.body.username && req.body.password && req.body.passwordConfirm) {
//     let userData = {
//         email: req.body.email,
//         username: req.body.username,
//         password: req.body.password,
//         passwordConfirm: req.body.passwordConfirm
//     }
//
//     User.create(userData, (err, user) => {
//       if (error) {
//         return next(error);
//       } else {
//         req.session.userId = user._id;
//         return res.redirect('/userProfile');
//       }
//     });
//   } else if (req.body.logemail, req.body.logpassword, (error, user) => {
//     User.authenticated(req.body.logemail, req.body.logpassword, (error, user) => {
//       if (error || !user) {
//         let err = new Error('Wrong email or password!');
//         err.status = 401;
//         return next(err);
//       } else {
//         req.session.userId = user._id;
//         return res.redirect('/userProfile');
//       }
//     });
//   });
// });
//
// router.get('/userProfile', (req, res, next) => {
//   User.findById(req.session.userId)
//   .exec((error, user) => {
//     if (error) {
//       return next(error);
//     } else {
//       if (user === null) {
//         let err = new Error('Not Authorized!');
//         err.status = 400;
//         return next(err);
//       } else {
//         return res.send('Something Here...')
//       }
//     }
//   });
// });
//
// router.get('/logout', (req, res, next) => {
//   if (req.session) {
//     req.session.destroy((err) => {
//       if (err) {
//         return next(err);
//       } else {
//         return res.redirect('/');
//       }
//     });
//   }
// });

///////////////////////////////////////////
router.get('/login', (req, res) => {
  login.login(req.body)
  .then((userToValidate) => {
    if(isValidUser === true) {
      res.status(200).send(isValidUser);
    } else {
      res.status(404).send('User Not Found!');
    }
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

// Delete User
router.delete('/deleteUser', (req, res) => {
  deleteUser.deleteUser(req.query.id)
  .then((userToDelete) => {
    res.status(200).send('User has been deleted.')
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

module.exports = router;
