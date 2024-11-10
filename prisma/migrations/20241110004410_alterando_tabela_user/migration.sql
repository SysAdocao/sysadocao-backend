/*
  Warnings:

  - You are about to alter the column `zipCode` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(9)`.
  - You are about to alter the column `complement` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the column `adopterId` on the `Adoption` table. All the data in the column will be lost.
  - You are about to drop the `Adopter` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Adoption` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "Adopter" DROP CONSTRAINT "Adopter_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Adoption" DROP CONSTRAINT "Adoption_adopterId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "zipCode" SET DATA TYPE VARCHAR(9),
ALTER COLUMN "complement" SET DEFAULT '',
ALTER COLUMN "complement" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Adoption" DROP COLUMN "adopterId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Adopter";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "phone" VARCHAR(20) NOT NULL,
    "addressId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
