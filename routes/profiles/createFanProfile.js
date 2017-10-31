let Profile = require('../../models/profile.model');

module.exports = {
  createFanProfile
}

function createFanProfile(req) {
  let newFanProfile = new Profile({
    bannerImage: req.body.bannerImage, // convert file to string and post file to objDB
    profileImage: req.body.profileImage, // convert file to string and post file to objDB
    artistName: null,
    profileType: 'fan',
    userName: 'get from username'
  });

  newFanProfile.save();
}
