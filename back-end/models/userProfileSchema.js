const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password_hash: {
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
  connection_first_name: {
    type: String,
    required: true
  },
  connection_last_name: {
    type: String,
    required: true
  },
  platforms: [PlatformSchema],
  connected_date: {
    type: Date,
    default: Date.now
  }
});

const UserSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  account: AccountSchema,
  platforms: [PlatformSchema],
  connections: [ConnectionSchema]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
