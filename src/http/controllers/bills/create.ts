import { makeCreateBillsUseCase } from '@/services/factories/make-create-bill-use-case'
import { FastifyJWT } from '@fastify/jwt'
import { $Enums } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

interface userToken {
  sub: string
  role: 'ADMIN' | 'MEMBER'
}

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createUser = z.object({
    billTypeID: z.coerce.number(),
    is_recurring: z.boolean().default(false),
    is_active: z.boolean().default(true),
    urgency: z.enum(['High', 'Medium', 'Low']),
    total_value: z.string(),
  })

  const token = await request
    .jwtVerify<userToken>()
    .then(decodedToken => decodedToken)
  const userId = token.sub
  const { billTypeID, is_active, is_recurring, total_value, urgency } =
    createUser.parse(request.body)

  try {
    const createBillsUseCase = makeCreateBillsUseCase()
    await createBillsUseCase.execute({
      userId,
      billTypeID,
      is_active,
      is_recurring,
      total_value,
      urgency,
    })
  } catch (err) {
    reply.status(409).send({ message: err })

    throw err
  }
  return await reply.status(201).send()
}
