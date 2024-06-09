import { PrismaBillsRepository } from '@/repositories/prisma/prisma-bills-repository'
import { FetchChartsDataUseCase } from '../fetch-charts-data'

export function makeFetchChartsDataUseCase() {
  const billsRepository = new PrismaBillsRepository()
  const makeFetchChartsDataUseCase = new FetchChartsDataUseCase(billsRepository)

  return makeFetchChartsDataUseCase
}
