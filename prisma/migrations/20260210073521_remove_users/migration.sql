/*
  Warnings:

  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_userId_fkey`;

-- DropTable
DROP TABLE `products`;

-- DropTable
DROP TABLE `users`;
