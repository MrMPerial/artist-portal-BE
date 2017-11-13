let Profile = require('../../models/profile.model');
let cloudinary = require('cloudinary');

module.exports = {
  createProfile
}

function createProfile(req, type, username, artistName) {
  let newProfile = new Profile({
    bannerImage: req.body.bannerImage, // convert file to string and post file to objDB
    profileImage: req.body.profileImage, // convert file to string and post file to objDB
    artistName: artistName,
    profileType: type,
    userName: username
  });
}
