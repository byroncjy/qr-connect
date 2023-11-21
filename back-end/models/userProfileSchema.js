const mongoose = require('mongoose');

//Revise 
const UserProfileSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  details: {
    type: String
  }
});

const UserProfile = mongoose.model('UserProfile', UserProfileSchema);

module.exports = UserProfile;