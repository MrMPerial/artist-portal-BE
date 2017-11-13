const mongoose = require('mongoose');

// const UserSchema = mongoose.Schema({
//   id: String
//   username: String
//   profileType: String
// });

const userSchema = new Schema({
  github: {
    id: String,
    username: String,
    publicRepos: Number
  }
});

module.exports = mongoose.model('User', UserSchema);
