import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function returnUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const allUsers = await prisma.user.findMany()

  return reply.status(200).send({ allUsers })
}
