let User = require('../../models/user.model');

module.exports = {
  login
}

function login( userToValidate ) {
  let isValidUser;
  return User.findById( userToValidate.id )
  .then((userFound) => {
    if (userFound.username === userToValidate.username && userFound.password === userToValidate.password) {
      return isValidUser = true;
    }

    return isValidUser = false;
  });
}
