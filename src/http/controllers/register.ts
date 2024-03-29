import { UserAlreadyExistsError } from '@/services/erros/user-already-exists-error'
import { makeRegisterUseCase } from '@/services/factories/make-register-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createUser = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = createUser.parse(request.body)

  try {
    const { registerUseCase } = makeRegisterUseCase()

    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      reply.status(409).send({ message: err.message })
    }

    reply.status(409).send({ message: err })

    throw err
  }

  return await reply.status(201).send()
}
