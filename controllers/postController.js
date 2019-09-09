const db = require('../models/Index');
const postController = {};

//get all posts
postController.getAll = (req,res)=>{
    db.Post.find().populate({
        path:"_creator",
        select: "username fullName"
    })
    .populate({
        path: "_likers",
        select: "fullName"
    }).populate({
        path:"_comments",
        select:"text _creator "
    })
    .then(posts=>{
        if(posts.length===0){
            res.status(404).json({
                msg: 'no posts found'
            })
            return;
        }
        res.json({
            msg: `${posts.length} post(s) found`,
            data: posts
        })

    }).catch(err=>{
        res.status(500).json({
            msg: err.message
        })
    })
};

//create post
postController.create = (req,res)=>{
    const {title, text, userId} = req.body;
    if(!title || !text || !userId){
        res.status(400).json({
            msg: 'please input complete data'
        })
        return;
    }
    const post = new db.Post({
        title,text,
        _creator: userId
    });
    post.save().then(savedPost=>{
        res.status(201).json({
            msg: 'post created',
            data: savedPost
        })
        db.User.findByIdAndUpdate(userId,{$inc:{postCount:1}},{useFindAndModify:false}).
        then().catch(err=>console.log(err));
    })
    .catch(err=>{
        res.status(500).json({
            msg: err.message
        })
    });
}

//edit post
postController.edit = (req,res)=>{
    const postId=req.params.id;
    const userId=req.body.userId;
    db.Post.findById(postId).then(post=>{
        if(post._creator==userId){
            db.Post.findByIdAndUpdate(postId,{
                "title": req.body.title,
                "text": req.body.text
            },{useFindAndModify:false}).then(()=>res.json({
                msg:'post updated'
            })).catch(err=>res.status(500).json({
                msg: err.message
            }))
        }
        else{
            res.status(400).json({
                msg: 'wrong creator id'
            })
        }
    }).catch(err=>{
        res.status(404).json({
            msg: 'no such post'
        })
    })
}

//delete post
postController.delete = (req,res)=>{
    const postId=req.params.id;
    const userId=req.body.userId;
    db.Post.findById(postId).then(post=>{
        if(post._creator==userId){
            db.Post.findByIdAndDelete(postId).then(()=>{res.json({
                msg:'post deleted'
            })
            db.User.findByIdAndUpdate(userId,{
                $inc:{postCount:-1}
                },{useFindAndModify:false})
            .then().catch(err=>console.log(err));
            }
            ).catch(err=>res.status(500).json({
                msg: err.message
            }))
        }
        else{
            res.status(400).json({
                msg: 'wrong creator id'
            })
        }
    }).catch(err=>{
        res.status(404).json({
            msg: 'no such post'
        })
    })
}
postController.like =(req,res)=>{
    const userId = req.body.userId;
    db.User.findById(userId).then(foundUser=>{
        db.Post.findByIdAndUpdate(req.params.id,{
            $inc:{likes:1},
            $push:{_likers:foundUser}
        },{useFindAndModify:false})
        .then(post=>{
            res.json({
                msg:'post liked'
            })
        }).catch(err=>{
            res.status(500).json({
                msg: err.message
            })
        })
    }).catch(err=>res.status(500).json({
                msg: err.message
            }));

    
    
}


module.exports = postController;