let Song = require('../../models/song.model');

module.exports = {
  updateSong
}

function updateSong(songToUpdate) {
  return Song.findById( songToUpdate.id )
  .then((songFound) => {
    let changes = {};
    songFound.image = songToUpdate.image;
    songFound.mp3 = songToUpdate.mp3;
    songFound.title = songToUpdate.title;
    songFound.downloadable = songToUpdate.downloadable;
    songFound.streamable = songToUpdate.streamable;
    songFound.numberOfLikes = songToUpdate.numberOfLikes;
    songFound.usersThatLiked = songToUpdate.usersThatLiked;
    return songFound.save();
  });
}
