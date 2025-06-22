// import type { HttpContext } from '@adonisjs/core/http'
// app/controllers/categories_controller.ts
import { HttpContext } from '@adonisjs/core/http'
import { getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory } from '#data/categories'

export default class CategoriesController {
  /**
   * Show all categories (admin view or for public filtering)
   */
async index({ view }: HttpContext) {
  const categories = getAllCategories().map((c) => ({
    ...c,
    timestamps: new Date(c.timestamps),
  }))

  return view.render('pages/categories/index', { categories })
}

  /**
   * Show create category form
   */
  async create({ view }: HttpContext) {
    const categories = getAllCategories()
        return view.render('pages/categories/create', {
            categories
        })
  }

  /**
   * Handle new category creation
   */
  async store({ request, response }: HttpContext) {
  const name = request.input('name')
  addCategory({ name })
  return response.redirect('/categories')
}


  /**
   * Show form to edit an existing category
   */
  async edit({ params, view, response }: HttpContext) {
    const category = getCategoryById(Number(params.id))
    if (!category) {
      return response.redirect('/categories')
    }
    const categories = getAllCategories()
        return view.render('pages/categories/edit', {
            categories,
            category
        })
    // return view.render('pages/categories/edit', { category })
  }

  /**
   * Handle update
   */
 async update({ params, request, response }: HttpContext) {
  const id = Number(params.id)
  const name = request.input('name')
  updateCategory(id, name)
  return response.redirect('/categories')
}


  /**
   * Delete category
   */
  async destroy({ params, response }: HttpContext) {
  const id = Number(params.id)
  deleteCategory(id)
  return response.redirect('/categories')
}

}