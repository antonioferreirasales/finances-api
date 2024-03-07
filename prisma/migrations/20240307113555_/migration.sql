-- AlterTable
ALTER TABLE "bill" ALTER COLUMN "finished_at" DROP NOT NULL,
ALTER COLUMN "cancelled_at" DROP NOT NULL;
