const db = require('../models/Index');
const commentController={};

commentController.create = (req,res)=>{
    const {userId,text} = req.body;
    const postId= req.params.id;
    db.User.findById(userId).then(user=>{
        const comment = new db.Comment({
            text,
            _creator: userId,
            _post: postId
        });
        comment.save().then(newComment=>{
            db.Post.findByIdAndUpdate(postId,{
                $push:{_comments:newComment},
                $inc: {commentsCount:1}
            },{
                useFindAndModify:false
            })
            .then(updatedPost=>{
                res.status(201).json({
                    msg: 'comment created',
                    data: updatedPost,
                    comment
                })
            }).catch(err=>{
                res.status(500).json({
                    msg: err.message
                })
            })
        })
        .catch(err=>console.log(err));
        
    }).catch(err=>{
        res.status(400).json({
            msg: 'no such user'
        })
    })
    
};

commentController.edit=(req,res)=>{
    const commentId=req.params.id;
    const{userId,text}=req.body;
    db.User.findById(userId)
    .then(user=>{
        db.Comment.findByIdAndUpdate(commentId,{text},{
            useFindAndModify:false
        })
        .then(editedComment=>{
            res.json({
                msg:'comment edited'
            })
        })
        .catch(err=>{
            res.status(404).json({
                msg: 'no such comment'
            })
        });
    }).catch(err=>{
        res.status(400).json({
            msg: 'invalid userId'
        });
    })
}

commentController.delete=(req,res)=>{
    const commentId=req.params.id;
    const {postId}=req.body;
    db.Comment.findByIdAndDelete(commentId)
    .then(()=>{
        db.Post.findByIdAndUpdate(postId,{
            $inc:{commentsCount:-1}
        },{useFindAndModify:false})
        .then()
        .catch(err=>res.status(500).json({
            msg: err.message
        }));
        res.json({
            msg:'comment deleted'
        })
    })
    .catch(err=>{
        res.status(404).json({
            msg: 'no such comment'
        })
    });
}
    

module.exports =commentController;