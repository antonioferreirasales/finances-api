import { makeGetUserProfileUseCase } from '@/services/factories/make-get-user-profile-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const getUserProfile = makeGetUserProfileUseCase()
  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  console.log(request.user.sub)

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
