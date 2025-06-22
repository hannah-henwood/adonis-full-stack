import { HttpContext } from '@adonisjs/core/http'
import { getAllProducts } from '#data/products'
import { getAllCategories } from '#data/categories'

export default class BlogController {
  private paginate<T>(items: T[], page: number, perPage: number) {
    const total = items.length
    const lastPage = Math.ceil(total / perPage)
    const start = (page - 1) * perPage
    const paginated = items.slice(start, start + perPage)

    return {
      data: paginated,
      meta: {
        total,
        perPage,
        currentPage: page,
        lastPage,
        previousPageUrl: page > 1 ? `/?page=${page - 1}` : null,
        nextPageUrl: page < lastPage ? `/?page=${page + 1}` : null
      }
    }
  }



public async home({ view, request }: HttpContext) {
  const rawPage = request.input('page')
  const page = Number.isInteger(Number(rawPage)) && Number(rawPage) > 0 ? Number(rawPage) : 1
  const search = request.input('search')?.toLowerCase() || ''
  const categoryId = request.input('category_id')

  const categories = getAllCategories()
  let products = getAllProducts()

  if (search) {
    products = products.filter((p) => p.name.toLowerCase().includes(search))
  }

  if (categoryId) {
    products = products.filter((p) => p.category_id === Number(categoryId))
  }

  products = products.map((product) => ({
    ...product,
    category: categories.find((c) => c.id === product.category_id),
  }))

  const { data, meta } = this.paginate(products, page, 6)

  
  return view.render('pages/home', {
    title: 'Welcome',
    products: data,
    meta,
    // Passed to layout
    categories,
    filter: { search, category_id: categoryId }
  })
}
}