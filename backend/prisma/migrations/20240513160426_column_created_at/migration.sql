/*
  Warnings:

  - Added the required column `category` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "closed_at" TIMESTAMP(3);
