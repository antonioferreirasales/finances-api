import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { history } from './history'
import { fetch } from './fetch'

export async function billsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/charts', fetch)
  app.post('/bills', create)
  app.get('/bills', history)
}
