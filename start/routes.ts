/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { getProductById } from '#data/products'
import router from '@adonisjs/core/services/router'

const AuthController = () => import ('#controllers/auth_controller')
const BlogController = () => import('#controllers/blog_controller')
const ProductsController = () => import('#controllers/products_controller')
const CategoriesController = () => import('#controllers/categories_controller')

router.get('/', [BlogController, 'home'])

// Post Routes
router.resource('products', ProductsController)
router.resource('categories', CategoriesController)

router.get('/login', [AuthController, 'showLogin'])
router.post('/login', [AuthController, 'login'])
router.post('/logout', [AuthController, 'logout'])

router.group(() => {
    router.get('/dashboard', async ({ view }) => {
        return view.render('pages/admin/dashboard', { message: 'Welcome to Admin Dashboard' })
    })
}).prefix('/admin')