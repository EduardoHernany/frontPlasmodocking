/*
  Warnings:

  - The primary key for the `auth_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `active` on the `auth_user` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `auth_user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `auth_user` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `auth_user` table. All the data in the column will be lost.
  - The `id` column on the `auth_user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `date_joined` to the `auth_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `auth_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_active` to the `auth_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_staff` to the `auth_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_superuser` to the `auth_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `auth_user` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `auth_user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "auth_user" DROP CONSTRAINT "auth_user_pkey",
DROP COLUMN "active",
DROP COLUMN "deleted",
DROP COLUMN "name",
DROP COLUMN "role",
ADD COLUMN     "date_joined" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL,
ADD COLUMN     "is_staff" BOOLEAN NOT NULL,
ADD COLUMN     "is_superuser" BOOLEAN NOT NULL,
ADD COLUMN     "last_login" TIMESTAMP(3),
ADD COLUMN     "last_name" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ADD CONSTRAINT "auth_user_pkey" PRIMARY KEY ("id");
