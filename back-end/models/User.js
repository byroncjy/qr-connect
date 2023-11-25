const mongoose = require('mongoose');

const platformSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

const connectionSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  platforms: [platformSchema],
  connected_date: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  account: accountSchema,
  platforms: [platformSchema],
  connections: [connectionSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
