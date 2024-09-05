import prisma from '../DB/db.config.js'
import asyncErrorHandler from '../utils/asyncErrorHandler.js';
import ErrorHandler from '../utils/errorMiddleware.js'


// CREATE POST
export const createPost = asyncErrorHandler(async (req, res, next) => {
    const { user_id, title, description } = req.body

    if (!user_id || !title || !description) {
        return next(new ErrorHandler(400, 'Please fill in all fields'))
    }

    const newPost = await prisma.post.create({
        data: {
            user_id: Number(user_id),
            title,
            description
        }
    })

    return res
        .status(200)
        .json({
            message: "Post created successfully", data: {
                newPost
            }
        })
})



// UPDATE POST
export const updatePost = asyncErrorHandler(async (req, res, next) => {
    const userId = req.params.id
    const { user_id, title, description } = req.body

    await prisma.post.update({
        where: {
            id: Number(userId)
        },
        data: {
            user_id: Number(user_id),
            title,
            description
        }
    })

    return res
        .status(200)
        .json({ message: "Post details updates successfully" })

})



// GET POSTS
export const getPosts = asyncErrorHandler(async (req, res, next) => {

    // PAGINATION
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if (page <= 0) {
        page = 1;
    }
    if (limit <= 0 || limit > 100) {
        limit = 10
    }
    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({
        skip: skip,
        take: limit,
        // Giving Comment under the Post
        include: {
            comment: {
                include: {
                    // Getting Comment With the respective User
                    // Todo->
                    // Get ProfilePic of user with their comments like we are getting name
                    user: {
                        select: {
                            name: true,
                        }
                    }
                }
            }
        },
        // Getting Post Created at Last First -> Like Stack
        orderBy: {
            id: "desc"
        },

        // APPLYING FILTERING -->

        // Getting Posts where comment count is greater than 2
        where: {
            comment_count: {
                gt: 1 // greater than equalt to 1 -> gte
            }
        },
        where: {
            // Can Apply Filtering with exact same title To get Particular Posts (by use of equals)
            title: {
                startsWith: "Next" // Get Posts whose Title starts with Next
            }
        },
        // using ends with 
        where: {
            title: {
                endsWith: "Text"
            }
        },
        where: {
            title: {
                equals: "Prisma Blog" // Title With Exact same comes
            }
        },
        where: {
            // OR
            OR: [
                {
                    title: {
                        startsWith: "Next",
                    },

                },
                {
                    title: {
                        endsWith: "Text"
                    }

                }
            ]
        },

        where: {
            // AND
            AND: [
                {
                    title: {
                        startsWith: "Prisma",
                    },

                },
                {
                    title: {
                        endsWith: "Blog"
                    }

                }
            ]
        },
        where: {
            // NOT
            NOT: {
                title: {
                    equals: "Prisma Blog"
                }
            }
        }
    })
    if (!posts) {
        return next(new ErrorHandler("No Post found", 400));
    }

    // to get the total post count
    const totalPosts = await prisma.post.count();
    const totalPages = Math.ceil(totalPosts / limit);

    return res
        .status(200)
        .json({
            message: "Posts fetched successfully", meta: { totalPages, currentPage: page, limit: limit }, data: {
                posts
            }
        })
})



// PARTICULAR POST PROFILE
export const postProfile = asyncErrorHandler(async (req, res, next) => {
    const postId = req.params.id
    const post = await prisma.post.findUnique({ where: { id: Number(postId) } })
    if (!post) {
        return next(new ErrorHandler("Post not found", 404))
    }
    return res
        .status(200)
        .json({ message: "Post fetched successfully", data: { post } })
})



// DELETE POST
export const deletePost = asyncErrorHandler(async (req, res, next) => {
    const postId = req.params.id
    await prisma.post.delete({ where: { id: Number(postId) } });
    return res
        .status(200)
        .json({ message: "Post deleted successfully" })
})


// To search in Long Text
export const searchPost = asyncErrorHandler(async (req, res, next) => {
    const query = req.query.q
    const posts = await prisma.post.findMany({
        where: {
            description: {
                search: query
            }
        }
    })
    return res
        .status(200)
        .json({
            message: "Posts fetched successfully with given Text",
            data: {
                posts
            }
        })
})