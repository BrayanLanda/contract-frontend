/*
  Warnings:

  - You are about to drop the column `contract` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[walletHash]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nit` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `contract`,
    ADD COLUMN `nit` INTEGER NOT NULL,
    ADD COLUMN `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    ADD COLUMN `walletHash` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_walletHash_key` ON `User`(`walletHash`);
