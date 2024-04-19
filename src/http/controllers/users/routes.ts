import type { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { returnUsers } from './return-users'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.get('/users', returnUsers)

  app.patch('/token/refresh', refresh)
  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
