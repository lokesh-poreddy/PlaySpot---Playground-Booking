/*
  Warnings:

  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Playground` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_playgroundId_fkey`;

-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_userId_fkey`;

-- DropTable
DROP TABLE `Booking`;

-- DropTable
DROP TABLE `Playground`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `users` (
    `userid` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`userid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `playgrounds` (
    `pid` INTEGER NOT NULL AUTO_INCREMENT,
    `playgroundcode` VARCHAR(191) NOT NULL,
    `playgroundname` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `hourlyrate` DOUBLE NOT NULL,
    `category` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `playgrounds_playgroundcode_key`(`playgroundcode`),
    PRIMARY KEY (`pid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `slots` (
    `slotid` INTEGER NOT NULL AUTO_INCREMENT,
    `pid` INTEGER NOT NULL,
    `slot_date` DATE NOT NULL,
    `start_time` TIME NOT NULL,
    `end_time` TIME NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'available',

    PRIMARY KEY (`slotid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookings` (
    `bookingid` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NOT NULL,
    `slotid` INTEGER NOT NULL,
    `booking_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `duration_hours` INTEGER NOT NULL,
    `total_amount` DOUBLE NOT NULL,

    PRIMARY KEY (`bookingid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `paymentid` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingid` INTEGER NOT NULL,
    `payment_date` DATETIME(3) NOT NULL,
    `amount_paid` DOUBLE NOT NULL,
    `payment_mode` VARCHAR(191) NULL,

    PRIMARY KEY (`paymentid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `reviewid` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NOT NULL,
    `pid` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` TEXT NULL,
    `review_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`reviewid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admins` (
    `adminid` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `admins_username_key`(`username`),
    PRIMARY KEY (`adminid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `slots` ADD CONSTRAINT `slots_pid_fkey` FOREIGN KEY (`pid`) REFERENCES `playgrounds`(`pid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `users`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_slotid_fkey` FOREIGN KEY (`slotid`) REFERENCES `slots`(`slotid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_bookingid_fkey` FOREIGN KEY (`bookingid`) REFERENCES `bookings`(`bookingid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `users`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_pid_fkey` FOREIGN KEY (`pid`) REFERENCES `playgrounds`(`pid`) ON DELETE RESTRICT ON UPDATE CASCADE;
