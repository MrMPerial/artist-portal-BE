let User = require('../../models/user.model');

module.exports = {
  deleteUser
}

function deleteUser(id) {
  return User.findById( id )
  .then((userFound) => {
    userFound.remove();
  })
  .catch((err) => {
    console.log(err);
  });
}
