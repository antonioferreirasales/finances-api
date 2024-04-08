/*
  Warnings:

  - You are about to drop the column `is_current` on the `bill` table. All the data in the column will be lost.
  - Added the required column `delay` to the `bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_date` to the `bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `importance` to the `bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_recurring` to the `bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `net_value` to the `bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pdf_url` to the `bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receipt` to the `bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urgency` to the `bill` table without a default value. This is not possible if the table is not empty.
  - Made the column `finished_at` on table `bill` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cancelled_at` on table `bill` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('High', 'Medium', 'Low');

-- AlterTable
ALTER TABLE "bill" DROP COLUMN "is_current",
ADD COLUMN     "delay" INTEGER NOT NULL,
ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "importance" "Level" NOT NULL,
ADD COLUMN     "is_recurring" BOOLEAN NOT NULL,
ADD COLUMN     "net_value" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "pdf_url" TEXT NOT NULL,
ADD COLUMN     "receipt" TEXT NOT NULL,
ADD COLUMN     "type" INTEGER NOT NULL,
ADD COLUMN     "urgency" "Level" NOT NULL,
ALTER COLUMN "finished_at" SET NOT NULL,
ALTER COLUMN "cancelled_at" SET NOT NULL;

-- CreateTable
CREATE TABLE "bill_type" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "bill_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bill" ADD CONSTRAINT "bill_type_fkey" FOREIGN KEY ("type") REFERENCES "bill_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
