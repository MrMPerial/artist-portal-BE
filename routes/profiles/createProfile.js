let Profile = require('../../model.profile.model');

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

module.exports = router;
