import { makeCreateBillsUseCase } from '@/services/factories/make-create-bill-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

interface userToken {
  sub: string
  role: 'ADMIN' | 'MEMBER'
}

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createUser = z.object({
    billTypeID: z.coerce.number(),
    description: z.string(),
    is_recurring: z.boolean().default(false),
    is_active: z.boolean().default(true),
    urgency: z.enum(['High', 'Medium', 'Low']),
    total_value: z.coerce.number(),
    net_value: z.coerce.number().optional(),
    due_date: z.coerce.date(),
  })

  const token = await request
    .jwtVerify<userToken>()
    .then(decodedToken => decodedToken)
  const userId = token.sub
  const {
    billTypeID,
    description,
    is_active,
    is_recurring,
    total_value,
    net_value,
    urgency,
    due_date,
  } = createUser.parse(request.body)

  try {
    const createBillsUseCase = makeCreateBillsUseCase()
    await createBillsUseCase.execute({
      userId,
      billTypeID,
      description,
      is_active,
      is_recurring,
      net_value,
      total_value,
      urgency,
      due_date,
    })
  } catch (err) {
    reply.status(409).send({ message: err })

    throw err
  }
  return await reply.status(201).send()
}
