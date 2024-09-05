import {Router} from 'express';


import { createPost, updatePost, getPosts, deletePost, postProfile, searchPost } from '../controllers/post.controllers.js';


const router = Router()

router.post('/createPost', createPost);
router.put('/updatePost/:id', updatePost);
router.get('/searchPost', searchPost);
router.get('/getPosts',getPosts);
router.get('/postProfile/:id', postProfile);
router.delete('/deletePost/:id', deletePost)


export default router