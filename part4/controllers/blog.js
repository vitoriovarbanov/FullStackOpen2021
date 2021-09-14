const blogsRouter = require('express').Router()
const Blog = require('../models/mongo')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, res) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })

    res.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    const body = request.body

    const decodedToken = jwt.decode(request.token, process.env.SECRET)
    if (!decodedToken) {
        return response.status(401).json({ error: 'missing or invalid token' })
    }

    const user = await User.findById(request.user._id.toString())

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    try {
        const savedBlog = await blog.save()
        response.json(savedBlog)
    } catch (err) {
        next(err)
    }
})

blogsRouter.get('/:id', (req, res) => {
    Blog
        .findById(req.params.id)
        .then(blogPost => {
            res.json(blogPost)
        })
})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    if(!blog.user){
        return res.status(401).json({error: 'User not found'})
    }
    
    if (blog.user.toString() === req.user._id.toString()) {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } else {
        return res.status(401).json({ error: 'missing or invalid token' })
    }

})

blogsRouter.put('/:id', middleware.userExtractor , async (req, res, next) => {
    const updatedBlog = req.body

    await Blog.findByIdAndUpdate(req.params.id, updatedBlog)
        .then(result => {
            res.send(updatedBlog)
        })
        .catch(err => next(err))

})

module.exports = blogsRouter