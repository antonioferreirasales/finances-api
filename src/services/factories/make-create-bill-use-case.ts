import { PrismaBillsRepository } from '@/repositories/prisma/prisma-bills-repository'
import { CreateBillUseCase } from '../create-bill'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeCreateBillsUseCase() {
  const billsRepository = new PrismaBillsRepository()
  const usersRepository = new PrismaUsersRepository()
  const makeCreateBillsUseCase = new CreateBillUseCase(
    billsRepository,
    usersRepository,
  )

  return makeCreateBillsUseCase
}
