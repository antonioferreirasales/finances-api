import { makeSearchBillsUseCase } from '@/services/factories/make-search-bills-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

interface userToken {
  sub: string
  role: 'ADMIN' | 'MEMBER'
}

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const token = await request
    .jwtVerify<userToken>()
    .then(decodedToken => decodedToken)
  const userID = token.sub

  try {
    const searchBillsUseCase = makeSearchBillsUseCase()
    const bills = await searchBillsUseCase.execute({
      userID,
    })
    return await reply.status(200).send(bills)
  } catch (err) {
    reply.status(409).send({ message: err })

    throw err
  }
}
