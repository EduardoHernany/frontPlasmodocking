/*
  Warnings:

  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[firstname]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstname` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "username",
ADD COLUMN     "firstname" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_firstname_key" ON "users"("firstname");
