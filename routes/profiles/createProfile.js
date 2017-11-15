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

function uploadProfileImage() {
  cloudinary.v2.uploader.upload('{{ file path }}',
  {public_id: "{{ username }}",
  transformation: [
    {
      width: 125,
      height: 125,
      crop: "scale"
    }
  ]
  },
  (error, result) => {
    if(error) {
      console.log(error);
      res.status(500).send('Something went wrong while uploading image. Please Try again.')
    }
    console.log(result);
    res.status(200).send('Image uploaded Successfully.')
  });
}
