import { BillsRepository } from '@/repositories/bills-repository'
import { Bill } from '@prisma/client'

interface SearchBillUseCaseRequest {
  userID: string
}

interface SearchBillUseCase {
  bills: Bill[] | null
}

export class SearchBillsUseCase {
  constructor(private billsRepository: BillsRepository) {}

  async execute({
    userID,
  }: SearchBillUseCaseRequest): Promise<SearchBillUseCase> {
    const bills = await this.billsRepository.searchByUser(userID)

    return { bills }
  }
}
