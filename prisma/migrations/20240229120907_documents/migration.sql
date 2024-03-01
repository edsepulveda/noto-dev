-- CreateTable
CREATE TABLE "public"."Documents" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "parentDocumentId" TEXT,
    "content" TEXT,
    "coverImage" TEXT,
    "icon" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Documents_parentDocumentId_key" ON "public"."Documents"("parentDocumentId");

-- CreateIndex
CREATE INDEX "by_user" ON "public"."Documents"("userId");

-- CreateIndex
CREATE INDEX "by_user_parent" ON "public"."Documents"("userId", "parentDocumentId");

-- AddForeignKey
ALTER TABLE "public"."Documents" ADD CONSTRAINT "Documents_parentDocumentId_fkey" FOREIGN KEY ("parentDocumentId") REFERENCES "public"."Documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
