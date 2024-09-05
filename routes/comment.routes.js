import {Router} from 'express';


import { commentProfile, createComment, deleteComment, getComments, getCommentsWithPostsAndUser, updateComment } from '../controllers/comment.controllers.js';


const router = Router()

router.post('/createComment', createComment);
router.put('/updateComment/:id', updateComment);
router.get('/getComments',getComments);
router.get('/commentProfile/:id', commentProfile);
router.delete('/deleteComment/:id', deleteComment);


router.get('/getCommentsWithPostsAndUser', getCommentsWithPostsAndUser);

export default router