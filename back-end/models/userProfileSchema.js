const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

const PlatformSchema = new mongoose.Schema({
  platform_id: {
    type: Number,
    required: true
  },
  platform_name: {
    type: String,
    required: true
  },
  platform_value: {
    type: String,
    required: true
  }
});

const ConnectionSchema = new mongoose.Schema({
  connection_id: {
    type: Number,
    required: true
  },
  firstName_connected_person: {
    type: String,
    required: true
  },
  lastName_connected_person: {
    type: String,
    required: true
  },
  platforms: [PlatformSchema],
  connectedDate: {
    type: Date,
    default: Date.now
  }
});

const UserSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  account: AccountSchema,
  platforms: [PlatformSchema],
  connections: [ConnectionSchema]
});

const User = mongoose.model('UserProfile', UserSchema);

module.exports = User;
