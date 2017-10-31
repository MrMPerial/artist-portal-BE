let Profile = require('../../models/profile.model');

module.exports = {
  createArtistProfile
}

function createArtistProfile(req) {
  let newArtistProfile = new Profile({
    bannerImage: req.body.bannerImage, // convert file to string and post file to objDB
    profileImage: req.body.profileImage, // convert file to string and post file to objDB
    artistName: req.body.artistName,
    profileType: 'artist',
    userName: 'get from username'
  });

  newArtistProfile.save();
}
