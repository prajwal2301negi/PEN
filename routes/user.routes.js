import {Router} from 'express';


import { createUser, deleteUser, getUsers, getUsersWithPosts, updateUser, userProfile, getUsersWithPostsAndInfo, getUsersWithTotalNoOfTheirPosts, getUsersWithTotalNoOfTheirPostsAndCounts } from '../controllers/user.controllers.js';


const router = Router()

router.post('/createUser', createUser);
router.put('/updateUser/:id', updateUser);
router.get('/getUsers',getUsers);
router.get('/userProfile/:id', userProfile);
router.delete('/deleteUser/:id', deleteUser);
router.get('/getUsersWithPosts', getUsersWithPosts)



router.get('/getUsersWithPostsAndInfo',getUsersWithPostsAndInfo)
router.get('/getUsersWithTotalNoOfTheirPosts',getUsersWithTotalNoOfTheirPosts)
router.get('/getUsersWithTotalNoOfTheirPostsAndCounts', getUsersWithTotalNoOfTheirPostsAndCounts)


export default router