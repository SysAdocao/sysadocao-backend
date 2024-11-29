-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
