const mongoose = require('mongoose');

const PlatformSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const ConnectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    platforms: [PlatformSchema],
    connectedAt: {
        type: Date,
        default: Date.now
    }

});

const UserProfileSchema = new mongoose.Schema({
    userId: {
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
    username: {
        type: String
    },
    connections: [ConnectionSchema]
});

const UserProfile = mongoose.model('UserProfile', UserProfileSchema);

module.exports = UserProfile;
