const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    isAdmin:{
        type: Boolean,
        default: false
    },
    username: {
        type: String,
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    joinedDate:{
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    postCount: {
        type: Number,
        default:0
    }
});

module.exports = mongoose.model('User',userSchema);