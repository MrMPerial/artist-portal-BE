const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  bannerImage: String,
  profileImage: String,
  artistName: String,
  profileType: String,
  userName: String
});

module.exports = mongoose.model('Profile', profileSchema);
