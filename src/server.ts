import { env } from './env'
import Fastify from 'fastify'
import { appRoutes } from './http/routes'

const app = Fastify({
  logger: true,
})

app.register(appRoutes)

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('The server has started! 💵')
  })
