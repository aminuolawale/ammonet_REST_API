const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    _creator:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    _comments:[{
        type:mongoose.Schema.ObjectId,
        ref: 'Comment'
    }],
    commentsCount:{
        type: Number,
        default:0
    },
    likes:{
        type: Number,
        default:0
    },
    _likers:[{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }]
})

module.exports = mongoose.model('Post',postSchema);