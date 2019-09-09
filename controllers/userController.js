const db=require('../models/Index');
const userController = {};

//get all users
userController.getAll = (req,res)=>{
    db.User.find().then(users=>{
        if(users.length===0){
            res.status(404).json({
                msg: 'no users found'
            })
            return;
        }
        res.json({
            msg: `${users.length} user(s) found`,
            data: users
        })
    }).catch(err=>{
        res.status(500).json({
            msg:err.message
        })
    })
}

//get single user
userController.getOne = (req,res)=>{
    db.User.findById(req.params.id).then(user=>{
        res.json({
            msg: `user found`,
            data: user
        })
    }).catch(err=>{
        res.status(404).json({
            msg:'no such user'
        })
    })
}
//create a user
userController.create = (req, res)=>{
    const {username,fullName,password,bio} = req.body;
    if(!username || !fullName || !password){
        res.status(400).json({
            msg: 'please input complete data'
        })
    }
    const user = new db.User({
        username,fullName,password,bio
    });
    user.save().then(newUser=>{
        res.status(201).json({
            msg: 'user created',
            data: newUser
        })
    }).catch(err=>{
        res.status(500).json({
            msg: error.message
        })
    })
}

//update a user
userController.update = (req,res)=>{
    db.User.findByIdAndUpdate(req.params.id,req.body,{useFindAndModify:false})
    .then(updatedUser=>{
        res.json({
            msg: 'user updated',
            data: updatedUser
        })
    }).catch(err=>{
        res.status(404).json({
            msg: 'no such user'
        })
    })
}

//delete a user
userController.delete = (req,res)=>{
    let areUsers=true;
    db.User.find().then(users=>{
        if(users.length===0){
            res.status(400).json({
                msg: 'no users to delete'
            })
            areUsers=false;
        }
    }).catch(err=>res.status(500).json({
        msg: err.message
    }))

    if(!areUsers)return;
    
    db.User.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.json({
            msg: 'user deleted'
        })
    }).catch(err=>{
        res.status(404).json({
            msg: 'no such user'
        })
        return;
    })
    //delete all users posts
    db.Post.deleteMany({"_creator":req.params.id}).then()
        .catch(err=>console.log(err));
    //delete all users comments
    db.Comment.deleteMany({"_creator":req.params.id}).then()
    .catch(err=>console.log(err));
    //whats left is to update postcounts on all posts commented on by user
}






module.exports = userController;