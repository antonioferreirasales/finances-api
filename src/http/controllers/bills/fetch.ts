import { makeFetchChartsDataUseCase } from '@/services/factories/make-fetch-charts-data-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

interface userToken {
  sub: string
  role: 'ADMIN' | 'MEMBER'
}

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const token = await request
    .jwtVerify<userToken>()
    .then(decodedToken => decodedToken)
  const userID = token.sub

  try {
    const FetchChartsDataUseCase = makeFetchChartsDataUseCase()
    const bills = await FetchChartsDataUseCase.fetchPieChart({
      userID,
    })
    return await reply.status(200).send(bills)
  } catch (err) {
    reply.status(409).send({ message: err })

    throw err
  }
}
