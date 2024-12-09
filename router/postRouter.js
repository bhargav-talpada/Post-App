const {Router} = require('express')
const { createPost, singlePost, updatePost, allPosts, DeletePost } = require('../controller/postController')
const {Protect} = require('../Middleware/auth')
const router = Router()
const photos = require('../multer/multer')

router.post('/posts',photos.single('post'),createPost)
router.get('/posts',Protect, allPosts)
router.get('/posts/:id',singlePost)
router.put('/posts/:id',photos.single('post'),updatePost)
router.delete('/posts/:id',DeletePost)


module.exports=router