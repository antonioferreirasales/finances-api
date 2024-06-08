import { Prisma } from '@prisma/client'
import { BillsRepository } from '../bills-repository'
import { prisma } from '@/lib/prisma'

export class PrismaBillsRepository implements BillsRepository {
  async searchType(id: number) {
    const billType = await prisma.billType.findUnique({ where: { id } })

    return billType
  }
  async create(data: Prisma.BillCreateInput) {
    const bill = await prisma.bill.create({
      data,
    })

    return bill
  }
}
