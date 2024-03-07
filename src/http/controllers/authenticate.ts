import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateUser = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateUser.parse(request.body)

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return reply.status(400).send({ message: 'Invalid Credentials' })
  }

  const isCorrectPassword = await compare(password, user.password_hash)

  !isCorrectPassword &&
    reply.status(400).send({ message: 'Invalid Credentials' })

  return reply.status(200).send()
}
