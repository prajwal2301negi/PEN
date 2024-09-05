import { Router } from "express";
import UserRoutes from './user.routes.js'
import PostRoutes from './post.routes.js'
import CommentRoutes from './comment.routes.js'

const router = Router();


// USER Routes
router.use('/api/user', UserRoutes);

// POST Routes
router.use('/api/post',PostRoutes)

// COMMENT Routes
router.use('/api/comment',CommentRoutes)

export default router;
