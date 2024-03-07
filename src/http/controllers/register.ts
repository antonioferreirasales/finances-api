import { makeRegisterUseCase } from '@/services/factories/make-register-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createUser = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  const { name, email, password } = createUser.parse(request.body)

  try {
    const { registerUseCase } = makeRegisterUseCase()

    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    reply.status(409).send({ message: err })

    throw err
  }

  return await reply.status(201).send()
}
