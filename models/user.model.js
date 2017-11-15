const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  id: String,
  username: String,
  profileType: String
});

module.exports = mongoose.model('User', UserSchema);
