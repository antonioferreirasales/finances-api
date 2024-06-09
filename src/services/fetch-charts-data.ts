import { BillsRepository } from '@/repositories/bills-repository'
import { PieSchema } from '@/repositories/prisma/prisma-bills-repository'
import { Bill } from '@prisma/client'

interface FetchChartsDataUseCaseRequest {
  userID: string
}

interface FetchChartsDataUseCaseResponse {
  bills: PieSchema[] | null
}

export class FetchChartsDataUseCase {
  constructor(private billsRepository: BillsRepository) {}

  async fetchPieChart({
    userID,
  }: FetchChartsDataUseCaseRequest): Promise<FetchChartsDataUseCaseResponse> {
    const bills = await this.billsRepository.fetchBillsByTypeAndPeriod(userID)

    return { bills }
  }
}
