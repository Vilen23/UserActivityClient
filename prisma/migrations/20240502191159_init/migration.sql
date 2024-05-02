-- CreateTable
CREATE TABLE "Twofactor" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Twofactor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Twofactor" ADD CONSTRAINT "Twofactor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
