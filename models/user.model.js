const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userID: String,
  userName: String,
  songLikes: []
});

module.exports = mongoose.model('User', UserSchema);
