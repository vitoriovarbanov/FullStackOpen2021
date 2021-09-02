const blogsRouter = require('express').Router()
const Blog = require('../models/mongo')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
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
        .catch(err=>next(err))

})

module.exports = blogsRouter