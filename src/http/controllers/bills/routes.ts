import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'

export async function billsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/bills', create)
}