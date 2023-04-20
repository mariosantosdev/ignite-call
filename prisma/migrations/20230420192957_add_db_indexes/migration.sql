-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `schedulings` DROP FOREIGN KEY `schedulings_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_time_interval` DROP FOREIGN KEY `user_time_interval_user_id_fkey`;

-- RedefineIndex
CREATE INDEX `accounts_user_id_idx` ON `accounts`(`user_id`);
DROP INDEX `accounts_user_id_fkey` ON `accounts`;

-- RedefineIndex
CREATE INDEX `schedulings_user_id_idx` ON `schedulings`(`user_id`);
DROP INDEX `schedulings_user_id_fkey` ON `schedulings`;

-- RedefineIndex
CREATE INDEX `sessions_user_id_idx` ON `sessions`(`user_id`);
DROP INDEX `sessions_user_id_fkey` ON `sessions`;

-- RedefineIndex
CREATE INDEX `user_time_interval_user_id_idx` ON `user_time_interval`(`user_id`);
DROP INDEX `user_time_interval_user_id_fkey` ON `user_time_interval`;
