import { Bill, BillType, Prisma, User } from '@prisma/client'
import { PieSchema } from './prisma/prisma-bills-repository'

export interface BillsRepository {
  searchType(id: number): Promise<BillType | null>
  create(data: Prisma.BillCreateInput): Promise<Bill>
  searchByUser(userID: string): Promise<Bill[] | null>
  fetchBillsByTypeAndPeriod(userID: string): Promise<PieSchema[] | null>
}
