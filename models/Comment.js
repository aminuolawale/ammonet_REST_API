const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    text:{
        type: String, required:true
    },
    createdAt:{ 
        type: Date, default: Date.now
    },
    _creator:{
        type: mongoose.Schema.ObjectId,
        ref:'User'
    },
    _post:{
        type:mongoose.Schema.ObjectId,
        ref:'Post'
    }
});

const autoPopulateCreator= function(next){
    this.populate({
        path: "_creator",
        select: "fullName"
    });
    next();
}

commentSchema.pre('find',autoPopulateCreator);

module.exports=mongoose.model('Comment', commentSchema);