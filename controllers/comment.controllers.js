import prisma from '../DB/db.config.js'
import asyncErrorHandler from '../utils/asyncErrorHandler.js';
import ErrorHandler from '../utils/errorMiddleware.js'


// CREATE COMMENT
export const createComment = asyncErrorHandler(async (req, res, next) => {
    const { user_id, post_id, comment } = req.body

    if (!user_id || !post_id || !comment) {
        return next(new ErrorHandler(400, 'Please fill in all fields'))
    }

    // Increment Comment By 1
    await prisma.post.update({
        where: {
            id: Number(post_id)
        },
        data: {
            comment_count: {
                increment: 1
            }
        }
    })

    const newComment = await prisma.comment.create({
        data: {
            user_id: Number(user_id),
            post_id: Number(post_id),
            comment,
        }
    })

    return res
        .status(200)
        .json({
            message: "Comment created successfully", data: {
                newComment
            }
        })
})



// UPDATE COMMENT
export const updateComment = asyncErrorHandler(async (req, res, next) => {
    const userId = req.params.id
    const { user_id, post_id, comment } = req.body

    await prisma.comment.update({
        where: {
            id: Number(userId)
        },
        data: {
            user_id: Number(user_id),
            post_id: Number(post_id),
            comment
        }
    })

    return res
        .status(200)
        .json({ message: "Comment details updates successfully" })

})


// GET COMMENTS WITH THEIR POST AND USER
export const getComments = asyncErrorHandler(async (req, res, next) => {
    const comments = await prisma.comment.findMany({})
    if (!comments) {
        return next(new ErrorHandler("No Comment found", 400));
    }
    return res
        .status(200)
        .json({
            message: "Comments fetched successfully", data: {
                comments
            }
        })
})



// GET COMMENTS WITH THEIR POST AND USER
export const getCommentsWithPostsAndUser = asyncErrorHandler(async (req, res, next) => {
    const comments = await prisma.comment.findMany({
        include:{
            user,
            post: {
                include:{
                    user:true
                }
            }
        }
    })
    if (!comments) {
        return next(new ErrorHandler("No Comment found", 400));
    }
    return res
        .status(200)
        .json({
            message: "Comments fetched successfully", data: {
                comments
            }
        })
})



// PARTICULAR COMMENT PROFILE
export const commentProfile = asyncErrorHandler(async (req, res, next) => {
    const commentId = req.params.id
    const comment = await prisma.comment.findUnique({ where: { id: Number(commentId) } })
    if (!comment) {
        return next(new ErrorHandler("comment not found", 404))
    }
    return res
        .status(200)
        .json({ message: "Comment fetched successfully", data: { comment } })
})



// DELETE COMMENT
export const deleteComment = asyncErrorHandler(async (req, res, next) => {
    const commentId = req.params.id

    // Decrement Comment By 1
    await prisma.post.update({
        where: {
            id: Number(post_id)
        },
        data: {
            comment_count: {
                decrement: 1
            }
        }
    })

    await prisma.comment.delete({ where: { id: Number(commentId) } });
    return res
        .status(200)
        .json({ message: "Comment deleted successfully" })
})