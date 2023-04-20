-- DropForeignKey
ALTER TABLE `schedulings` DROP FOREIGN KEY `schedulings_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_time_interval` DROP FOREIGN KEY `user_time_interval_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `user_time_interval` ADD CONSTRAINT `user_time_interval_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedulings` ADD CONSTRAINT `schedulings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
