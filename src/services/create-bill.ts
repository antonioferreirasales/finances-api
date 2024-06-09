import { BillsRepository } from '@/repositories/bills-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Bill, $Enums, Prisma } from '@prisma/client'

interface CreateBillUseCaseRequest {
  userId: string
  billTypeID: number
  description: string
  is_recurring: boolean
  is_active: boolean
  urgency: $Enums.Level
  total_value: number
  gross_value?: number
  due_date: Date
}

interface CreateBillUseCaseResponse {
  bill: Bill
}

export class CreateBillUseCase {
  constructor(
    private billsRepository: BillsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    billTypeID,
    description,
    is_active,
    is_recurring,
    total_value,
    gross_value,
    urgency,
    due_date,
  }: CreateBillUseCaseRequest): Promise<CreateBillUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    const billType = await this.billsRepository.searchType(billTypeID)
    const bill = await this.billsRepository.create({
      description,
      is_recurring,
      is_active,
      urgency,
      total_value,
      gross_value,
      due_date,
      user: {
        connect: {
          id: userId,
        },
      },
      billTypeId: { connect: { id: billType?.id } },
    })

    return { bill }
  }
}
