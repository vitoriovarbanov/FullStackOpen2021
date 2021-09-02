const blogsRouter = require('express').Router()
const Blog = require('../models/mongo')
const User = require('../models/user')

blogsRouter.get('/', async (request, res) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })

        res.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const user = await User.findById(body.userId)

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

blogsRouter.delete('/:id', async (req, res) => {
    await Blog
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
})

blogsRouter.put('/:id', async (req, res, next) => {
    const updatedBlog = req.body

    await Blog.findByIdAndUpdate(req.params.id, updatedBlog)
        .then(result => {
            res.send(updatedBlog)
        })
        .catch(err => next(err))

})

module.exports = blogsRouter