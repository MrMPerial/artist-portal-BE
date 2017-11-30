let Song = require('../../models/song.model');
let cloudinary = require('cloudinary');

module.exports = {
  submitSong
}

// function upload song to cloudinary
// retrieve link
// add link to submit song function

function submitSong(req) {
  let newSong = new Song({
    image: req.body.image, // convert file to string and post file to objDB
    mp3: req.body.mp3, // convert file to string and post file to objDB
    title: req.body.title,
    downloadable: true,
    streamable: true,
    numberOfLikes: 0
  });

  newSong.save();
}
