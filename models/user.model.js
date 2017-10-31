const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: String,
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  profileType: String
});

module.exports = mongoose.model('User', userSchema);
