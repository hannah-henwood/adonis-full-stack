import { HttpContext } from '@adonisjs/core/http'
import { getAllPosts, getPostById, createPost, updatePost, deletePost, publishPost } from '#data/posts'

export default class ProductsController {
    /**
     * Display a list of all posts with optional filtering 
     */
    async index({ view, request }: HttpContext) {
        const author = request.input('author') as string | undefined
        const search = request.input('search') as string | undefined
        let posts = getAllPosts()

        // Filter by author if provided
        if (author) {
            posts = posts.filter(post => post.author.toLowerCase().includes(author.toLowerCase()))
        }

        //Filter by search term in title if provided
        if (search) {
            posts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
        }

        return view.render('pages/posts/index', { posts, filter: { author, search } })
    }

    /**
     * Display the form to create a new post
     */
    async create({ view }: HttpContext) {
        return view.render('pages/posts/create')
    }

    /**
     * Store a new post
     */
    async store({ request, response }: HttpContext) {
        const title = request.input('title')
        const content = request.input('content')
        const author = request.input('author')

        createPost({
            title: title as string,
            content: content as string,
            author: author as string
        })

        return response.redirect('/posts')
    }

    /**
     * Display a single post
     */
    async show({ params, view, response }: HttpContext) {
        const post = getPostById(Number(params.id))

        if (!post) {
            return response.redirect('/posts')
        }

        return view.render('pages/posts/show', { post })
    }

    /**
     * Display form to edit a post
     */
    async edit({ params, view, response }: HttpContext) {
        const post = getPostById(Number(params.id))

        if (!post) {
            return response.redirect('/posts')
        }

        return view.render('pages/posts/edit', { post })
    }

    /**
     * Update a post
     */
    async update({ params, request, response }: HttpContext) {
        const id = Number(params.id)
        const title = request.input('title')
        const content = request.input('content')
        const author = request.input('author')

        updatePost(id, {
            title: title as string,
            content: content as string, 
            author: author as string
        })

        return response.redirect(`/posts/${id}`)
    }

    /**
     * Delete a post
     */
    async destroy({ params, response }: HttpContext) {
        const id = Number(params.id)
        deletePost(id)

        return response.redirect('/posts')
    }

    /**
     * Mark a post as published
     */
    async publish({ params, response }: HttpContext) {
        const id = Number(params.id)
        publishPost(id)
        return response.redirect(`/posts/${id}`)
    }

    /**
     * Clear all filters and redirect to posts index
     */
    async clearFilters({ response }: HttpContext) {
        return response.redirect('/posts')
    }
}