const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
  artist: String,
  imageID: String,
  audioID: String,
  title: String,
  downloadable: Boolean,
  streamable: Boolean,
  numberOfLikes: Number
});

module.exports = mongoose.model('Song', songSchema);
