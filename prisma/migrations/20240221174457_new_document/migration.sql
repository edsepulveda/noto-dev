/*
  Warnings:

  - You are about to drop the column `parentDocument` on the `Documents` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[parentDocumentId]` on the table `Documents` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."by_user_parent";

-- AlterTable
ALTER TABLE "public"."Documents" DROP COLUMN "parentDocument",
ADD COLUMN     "parentDocumentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Documents_parentDocumentId_key" ON "public"."Documents"("parentDocumentId");

-- CreateIndex
CREATE INDEX "by_user_parent" ON "public"."Documents"("userId", "parentDocumentId");

-- AddForeignKey
ALTER TABLE "public"."Documents" ADD CONSTRAINT "Documents_parentDocumentId_fkey" FOREIGN KEY ("parentDocumentId") REFERENCES "public"."Documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
