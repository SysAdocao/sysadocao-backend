/*
  Warnings:

  - Added the required column `imageUrl` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "isCastrated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVacinated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "size" "Size" NOT NULL;
