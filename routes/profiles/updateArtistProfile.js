let Profile = require('../../models/profile.model');

module.exports = {
  updateArtistProfile
}

function updateArtistProfile(profileToUpdate) {
  return Profile.findById( profileToUpdate.id )
  .then((profileFound) => {
    profileFound.bannerImage = profileToUpdate.bannerImage;
    profileFound.profileImage = profileToUpdate.profileImage;
    profileFound.artistName = profileToUpdate.artistName;
    profileFound.profileType = profileToUpdate.profileType;
    profileFound.userName = profileToUpdate.userName;
    return profileFound.save();
  });
}
