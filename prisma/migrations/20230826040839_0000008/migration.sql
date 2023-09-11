/*
  Warnings:

  - The primary key for the `auth_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date_joined` on the `auth_user` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `auth_user` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `auth_user` table. All the data in the column will be lost.
  - You are about to drop the column `is_staff` on the `auth_user` table. All the data in the column will be lost.
  - You are about to drop the column `is_superuser` on the `auth_user` table. All the data in the column will be lost.
  - You are about to drop the column `last_login` on the `auth_user` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `auth_user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth_user" DROP CONSTRAINT "auth_user_pkey",
DROP COLUMN "date_joined",
DROP COLUMN "first_name",
DROP COLUMN "is_active",
DROP COLUMN "is_staff",
DROP COLUMN "is_superuser",
DROP COLUMN "last_login",
DROP COLUMN "last_name",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deleted" BOOLEAN DEFAULT false,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "auth_user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "auth_user_id_seq";
