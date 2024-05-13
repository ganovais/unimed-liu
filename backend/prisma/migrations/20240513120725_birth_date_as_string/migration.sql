/*
  Warnings:

  - You are about to drop the column `birthDate` on the `patients` table. All the data in the column will be lost.
  - Added the required column `birth_date` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "patients" DROP COLUMN "birthDate",
ADD COLUMN     "birth_date" TEXT NOT NULL;
