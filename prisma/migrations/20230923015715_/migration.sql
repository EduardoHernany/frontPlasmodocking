/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[namee]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `namee` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_name_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "namee" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_namee_key" ON "users"("namee");
