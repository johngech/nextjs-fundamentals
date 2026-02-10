/*
  Warnings:

  - You are about to drop the column `userId` on the `products` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_userId_fkey`;

-- DropIndex
DROP INDEX `products_userId_fkey` ON `products`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `userId`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
