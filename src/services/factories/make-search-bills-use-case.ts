import { PrismaBillsRepository } from '@/repositories/prisma/prisma-bills-repository'
import { SearchBillsUseCase } from '../search-bills'

export function makeSearchBillsUseCase() {
  const billsRepository = new PrismaBillsRepository()
  const makeSearchBillsUseCase = new SearchBillsUseCase(billsRepository)

  return makeSearchBillsUseCase
}
