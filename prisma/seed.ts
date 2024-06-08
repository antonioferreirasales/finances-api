import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const bill_type = await prisma.billType.createMany({
    data: [
      { description: 'Cobrança' },
      { description: 'Imprevisto' },
      { description: 'Salário' },
      { description: 'Outros' },
    ],
  })

  console.log({ bill_type })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
