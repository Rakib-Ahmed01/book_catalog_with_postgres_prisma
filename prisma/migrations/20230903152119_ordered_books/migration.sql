/*
  Warnings:

  - The `orderedBooks` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderedBooks",
ADD COLUMN     "orderedBooks" JSONB[],
ALTER COLUMN "status" SET DEFAULT 'pending';
