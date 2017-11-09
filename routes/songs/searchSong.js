let Song = require('../../models/song.model');

module.exports = {
  searchSong
}

function searchSong(req) {
  return Song.find({ title: req }).populate('songs').exec();
}
