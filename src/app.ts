import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import cors from '@fastify/cors'
import { usersRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify({
  logger: true,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(usersRoutes)
app.register(cors, {
  origin: true,
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV != 'production') {
    console.error(error)
  } else {
    // TODO:Here we should log out to an external tool like DataDog
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
