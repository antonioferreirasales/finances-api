import type { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { returnUsers } from './return-users'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.get('/users', returnUsers)

  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
