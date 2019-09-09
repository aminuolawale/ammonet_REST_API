const router = require('express').Router();
const basicController= require('../../controllers/basicController');
const userController = require('../../controllers/userController');
const postController = require('../../controllers/postController');
const commentController = require('../../controllers/commentController');
//base route
router.get('/',basicController.get);

//user routes
router.get('/users', userController.getAll);
router.get('/user/:id',userController.getOne)
router.post('/users', userController.create);
router.put('/user/:id', userController.update);
router.delete('/user/:id',userController.delete);

//Post routes
router.get('/posts',postController.getAll);
router.post('/posts',postController.create);
router.put('/post/:id',postController.edit);
router.delete('/post/:id',postController.delete);
router.put('/like/:id',postController.like);

//comment routes
router.post('/comment/:id',commentController.create);
router.put('/comment/:id',commentController.edit);
router.put('/comment/delete/:id',commentController.delete);

module.exports=router;