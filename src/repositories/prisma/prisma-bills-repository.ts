import { Prisma } from '@prisma/client'
import { BillsRepository } from '../bills-repository'
import { prisma } from '@/lib/prisma'

export interface PieSchema {
  type: number
  total: number
  period: string
}

export class PrismaBillsRepository implements BillsRepository {
  async searchType(id: number) {
    const billType = await prisma.billType.findUnique({ where: { id } })

    return billType
  }

  async searchByUser(userID: string) {
    const bills = await prisma.bill.findMany({
      where: { user_id: userID },
      orderBy: { created_at: 'desc' },
    })

    return bills
  }

  async fetchBillsByTypeAndPeriod(userID: string) {
    const bills = await prisma.$queryRaw<PieSchema[]>`
      SELECT 
        type,
        ROUND(SUM(total_value), 2) as total_amount,
          to_char(due_date, 'MM/YYYY') as month_year
      FROM 
          bill
      WHERE user_id = ${userID}
      GROUP BY 
          type, month_year
      ORDER BY
          type ASC, month_year DESC;
      `

    return bills
  }

  async create(data: Prisma.BillCreateInput) {
    const bill = await prisma.bill.create({
      data,
    })

    return bill
  }
}
