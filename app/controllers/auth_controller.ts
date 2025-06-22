import { HttpContext } from '@adonisjs/core/http'
import { schema, rules } from '@adonisjs/validator'

export default class AuthController {
  /**
   * Display the login form
   */
  async showLogin({ view }: HttpContext) {
    return view.render('auth/login')
  }

  /**
   * Handle login attempt
   */
  async login({ request, auth, response, session }: HttpContext) {
    const loginSchema = schema.create({
      email: schema.string([rules.email(), rules.trim()]),
      password: schema.string([rules.minLength(6)]),
    })

    try {
      const { email, password } = await request.validate({ schema: loginSchema })
      await auth.use('web').attempt(email, password)
      session.flash('message', 'Logged in successfully')
      return response.redirect('/')
    } catch (error) {
      session.flash('errors', [error.message || 'Invalid email or password'])
      return response.redirect().back()
    }
  }

  /**
   * Handle logout
   */
  async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()
    session.flash('message', 'Logged out successfully')
    return response.redirect('/')
  }
}