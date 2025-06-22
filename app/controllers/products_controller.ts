import { HttpContext } from '@adonisjs/core/http'
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, publishProduct } from '#data/products'
import { getAllCategories } from '#data/categories'
//import { timestamps } from 'console'

export default class ProductsController {
    /**
     * Display a list of all products with optional filtering 
     */
    async index({ view, request }: HttpContext) {
        const name = request.input('name') as string | undefined
        const search = request.input('search') as string | undefined
        let products = getAllProducts()

        // Filter by author if provided
        if (name) {
            products = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()))
        }

        //Filter by search term in title if provided
        if (search) {
            products = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
        }
        const categories = getAllCategories()
        return view.render('pages/products/index', {
            categories,
            products
        })
        // return view.render('pages/products/index', { products, filter: { name, search } })
    }


//     // Makes home show products
//     async home({ view, request }: HttpContext) {
//   const search = request.input('search')?.toLowerCase() || ''
//   const categoryId = request.input('category_id')
//   const page = Number(request.input('page') || '1')
//   const perPage = 6

//   let products = getAllProducts()

//   // Filter by name
//   if (search) {
//     products = products.filter(p => p.name.toLowerCase().includes(search))
//   }

//   // Filter by category
//   if (categoryId) {
//     products = products.filter(p => p.category_id === Number(categoryId))
//   }

//   // Pagination
//   const total = products.length
//   const lastPage = Math.ceil(total / perPage)
//   const paginated = products.slice((page - 1) * perPage, page * perPage)

//   // Example categories, unless you have a helper
//   const categories = [
//     { id: 1, name: 'Electronics' },
//     { id: 2, name: 'Clothing' },
//     { id: 3, name: 'Books' }
//   ]

//   return view.render('pages/home', {
//     products: paginated,
//     categories,
//     filter: { search, category_id: categoryId },
//     meta: {
//       total,
//       perPage,
//       currentPage: page,
//       lastPage,
//       previousPageUrl: page > 1 ? `/?page=${page - 1}` : null,
//       nextPageUrl: page < lastPage ? `/?page=${page + 1}` : null
//     }
//   })
// }


    /**
     * Display the form to create a new product
     */
    async create({ view }: HttpContext) {
        const categories = getAllCategories()
        return view.render('pages/products/create', {
            categories
        })

    }

    /**
     * Store a new product
     */
    async store({ request, response }: HttpContext) {
        const name = request.input('name')
        const description = request.input('description')
        const price = request.input('price')
        const image_path = request.input('image_path')
        const category_id = request.input('category_id')
        const timestamps = new Date()

        createProduct({
            name: name as string,
            description: description as string,
            price: price as string,
            image_path: image_path as string,
            category_id: Number(category_id),
            timestamps: timestamps as Date
        })

        return response.redirect('/products')
    }

    /**
     * Display a single product
     */
    async show({ params, view, response }: HttpContext) {
        const product = getProductById(Number(params.id))

        if (!product) {
            return response.redirect('/products')
        }
        const categories = getAllCategories()
        return view.render('pages/products/show', {
            categories,
            product
        })
    }

    /**
     * Display form to edit a product
     */
    async edit({ params, view, response }: HttpContext) {
        const product = getProductById(Number(params.id))

        if (!product) {
            return response.redirect('/products')
        }
        const categories = getAllCategories()
        return view.render('pages/products/edit', {
            categories,
            product
        })
    }

    /**
     * Update a product
     */
    async update({ params, request, response }: HttpContext) {
        const id = Number(params.id)
        const name = request.input('name')
        const description = request.input('description')
        const price = request.input('price')
        const image_path = request.input('image_path')
        const category_id = request.input('category_id')
        const timestamps = new Date()

        updateProduct(id, {
            name: name as string,
            description: description as string,
            price: price as string,
            image_path: image_path as string,
            category_id: Number(category_id),
            timestamps: timestamps as Date
        })

        return response.redirect(`/products/${id}`)
    }

    /**
     * Delete a product
     */
    async destroy({ params, response }: HttpContext) {
        const id = Number(params.id)
        deleteProduct(id)

        return response.redirect('/products')
    }

    /**
     * Mark a product as published
     */
    async publish({ params, response }: HttpContext) {
        const id = Number(params.id)
        publishProduct(id)
        return response.redirect(`/products/${id}`)
    }

    /**
     * Clear all filters and redirect to products index
     */
    async clearFilters({ response }: HttpContext) {
        return response.redirect('/products')
    }
}