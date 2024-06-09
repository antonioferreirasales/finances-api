/*
  Warnings:

  - You are about to drop the column `net_value` on the `bill` table. All the data in the column will be lost.
  - Made the column `description` on table `bill` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "bill" DROP COLUMN "net_value",
ADD COLUMN     "gross_value" DECIMAL(65,30),
ALTER COLUMN "description" SET NOT NULL;
