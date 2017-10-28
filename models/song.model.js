const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
  image: String,
  mp3: String,
  title: String,
  downloadable: Boolean,
  streamable: Boolean,
  numberOfLikes: Number,
  usersThatLiked: String[]
});

module.exports = mongoose.model('Song', songSchema);
