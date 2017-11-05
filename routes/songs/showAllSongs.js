let Song = require('../../models/song.model');

module.exports = {
  showAllSongs
}

function showAllSongs() {
  return Song.find({}).populate('songs').exec();
}
