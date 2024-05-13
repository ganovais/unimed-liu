/*
  Warnings:

  - Added the required column `type_sector` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "type_sector" TEXT NOT NULL;
