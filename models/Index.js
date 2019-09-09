//index of all models so that each model is available to all 
//controllers in a single object
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
module.exports={
    User,
    Post,
    Comment
}