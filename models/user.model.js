const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const UserSchema = mongoose.Schema({
//   id: String
//   username: String
//   profileType: String
// });

const UserSchema = new Schema({
  github: {
    id: String,
    username: String,
    publicRepos: Number
  }
});

module.exports = mongoose.model('User', UserSchema);
