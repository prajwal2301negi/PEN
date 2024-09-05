import prisma from '../DB/db.config.js'
import asyncErrorHandler from '../utils/asyncErrorHandler.js';
import ErrorHandler from '../utils/errorMiddleware.js'


// CREATE USER
export const createUser = asyncErrorHandler(async (req, res, next) => {
    const { name, email, password } = req.body
    if (!email || !name || !password) {
        return next(new ErrorHandler(400, 'Please fill in all fields'))
    }

    const findUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (findUser) {
        return next(new ErrorHandler(400, 'Email already exists'))
    }

    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password
        }
    })

    return res
        .status(200)
        .json({
            message: "User created successfully", data: {
                newUser
            }
        })
})



// UPDATE USER
export const updateUser = asyncErrorHandler(async (req, res, next) => {
    const userId = req.params.id
    const { name, email, password } = req.body;

    await prisma.user.update({
        where: {
            id: Number(userId)
        },
        data: {
            name,
            email,
            password
        }
    })

    return res
        .status(200)
        .json({ message: "User details updates successfully" })

})



// GET USERS
export const getUsers = asyncErrorHandler(async (req, res, next) => {
    const users = await prisma.user.findMany({})
    if (!users) {
        return next(new ErrorHandler("No User found", 400));
    }
    return res
        .status(200)
        .json({
            message: "User details fetched successfully", data: {
                users
            }
        })
})



// USER PROFILE
export const userProfile = asyncErrorHandler(async (req, res, next) => {
    const userId = req.params.id
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } })
    if (!user) {
        return next(new ErrorHandler("User not found", 404))
    }
    return res
        .status(200)
        .json({ message: "User profile fetched successfully", data: { user } })
})



// DELETE PROFILE
export const deleteUser = asyncErrorHandler(async (req, res, next) => {
    const userId = req.params.id
    await prisma.user.delete({ where: { id: Number(userId) } });
    return res
        .status(200)
        .json({ message: "User deleted successfully" })
})


// GET USERS WITH THEIR POSTS
export const getUsersWithPosts = asyncErrorHandler(async (req, res, next) => {
    const users = await prisma.user.findMany({
        include: {
            post: true,
        }
    })
    if (!users) {
        return next(new ErrorHandler("No User found", 400));
    }
    return res
        .status(200)
        .json({
            message: "User details fetched successfully", data: {
                users
            }
        })
})


// GET USERS WITH THEIR POSTS AND SELECTED INFO
export const getUsersWithPostsAndInfo = asyncErrorHandler(async (req, res, next) => {
    const users = await prisma.user.findMany({
        include: {
            post: {
                select: {
                    title: true,
                    comment_count: true
                }
            }
        }
    })
    if (!users) {
        return next(new ErrorHandler("No User found", 400));
    }
    return res
        .status(200)
        .json({
            message: "User details fetched successfully", data: {
                users
            }
        })
})




// GET USERS WITH THEIR TOTAL NO OF POSTS
export const getUsersWithTotalNoOfTheirPosts = asyncErrorHandler(async (req, res, next) => {
    const users = await prisma.user.findMany({
        select:{
            _count:{
                select:{
                    post:true
                }
            }
        }
    })
    if (!users) {
        return next(new ErrorHandler("No User found", 400));
    }
    return res
        .status(200)
        .json({
            message: "User details fetched successfully", data: {
                users
            }
        })
})



// GET USERS WITH THEIR TOTAL NO OF POSTS AND COUNTS
export const getUsersWithTotalNoOfTheirPostsAndCounts = asyncErrorHandler(async (req, res, next) => {
    const users = await prisma.user.findMany({
        select:{
            _count:{
                select:{
                    post:true,
                    comment:true
                }
            }
        }
    })
    if (!users) {
        return next(new ErrorHandler("No User found", 400));
    }
    return res
        .status(200)
        .json({
            message: "User details fetched successfully", data: {
                users
            }
        })
})
