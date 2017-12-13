const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userID: String,
  userName: String,
  songLikes: [],
  profileType: String
  // profile types include: artist, fan and ar
});

module.exports = mongoose.model('User', UserSchema);
