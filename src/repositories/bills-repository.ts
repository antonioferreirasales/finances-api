import { Bill, BillType, Prisma, User } from '@prisma/client'

export interface BillsRepository {
  searchType(id: number): Promise<BillType | null>
  create(data: Prisma.BillCreateInput): Promise<Bill>
}
