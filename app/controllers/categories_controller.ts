// import type { HttpContext } from '@adonisjs/core/http'
// app/controllers/categories_controller.ts
import { HttpContext } from '@adonisjs/core/http'
import { getAllCategories, getCategoryById } from '#data/categories'

export default class CategoriesController {
  /**
   * Show all categories (admin view or for public filtering)
   */
  async index({ view }: HttpContext) {
    const categories = getAllCategories()
    return view.render('pages/categories/index', { categories })
  }

  /**
   * Show create category form
   */
  async create({ view }: HttpContext) {
    return view.render('pages/categories/create')
  }

  /**
   * Handle new category creation
   */
  async store({ request, response }: HttpContext) {
    const name = request.input('name')
    // TODO: validate and add to your in-memory categories
    // Example: addCategory({ name })
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

    return view.render('pages/categories/edit', { category })
  }

  /**
   * Handle update
   */
  async update({ params, request, response }: HttpContext) {
    const name = request.input('name')
    // TODO: find category by id and update name
    return response.redirect('/categories')
  }

  /**
   * Delete category
   */
  async destroy({ params, response }: HttpContext) {
    const id = Number(params.id)
    // TODO: remove category by id
    return response.redirect('/categories')
  }
}