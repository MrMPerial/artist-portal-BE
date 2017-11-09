let Song = require('../../models/song.model');

module.exports = {
  deleteSong
}

function deleteSong(id) {
  return Song.findById( id )
  .then((songFound) => {
    songFound.remove();
  })
  .catch((err) => {
    console.log(err);
  });
}
