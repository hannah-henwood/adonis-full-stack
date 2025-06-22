// import { UserSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class UserSeeder {
  async run() {
    const scrypt = hash.use('scrypt')

    await User.create({
      email: 'admin@example.com',
      password: await scrypt.make('password'),
    })
  }
}