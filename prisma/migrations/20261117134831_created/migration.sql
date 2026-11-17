-- CreateTable
CREATE TABLE `Category` (
    `name` VARCHAR(256) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
