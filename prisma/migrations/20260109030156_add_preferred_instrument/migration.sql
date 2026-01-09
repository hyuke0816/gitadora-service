-- CreateTable
CREATE TABLE `tb_song_informations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `titleIndex` VARCHAR(191) NULL,
    `artist` VARCHAR(191) NOT NULL,
    `artistId` INTEGER NULL,
    `bpm` VARCHAR(191) NULL,
    `version` VARCHAR(191) NOT NULL,
    `youtubeUrl` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,
    `isExist` BOOLEAN NOT NULL DEFAULT true,
    `isHot` BOOLEAN NOT NULL DEFAULT false,
    `isLicense` BOOLEAN NOT NULL DEFAULT false,
    `isCover` BOOLEAN NOT NULL DEFAULT false,
    `isLong` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_gitadora_versions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `startedAt` DATETIME(3) NOT NULL,
    `endedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `ingamename` VARCHAR(191) NULL,
    `gitadoraId` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `socialUserId` VARCHAR(191) NULL,

    UNIQUE INDEX `tb_users_gitadoraId_key`(`gitadoraId`),
    UNIQUE INDEX `tb_users_socialUserId_key`(`socialUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_accounts` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `tb_accounts_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_sessions` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tb_sessions_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_social_users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `nickname` VARCHAR(191) NULL,
    `bio` VARCHAR(100) NULL,
    `isOnboarded` BOOLEAN NOT NULL DEFAULT false,
    `preferredInstrument` ENUM('GUITAR', 'BASS', 'DRUM', 'OPEN') NOT NULL DEFAULT 'GUITAR',
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `tb_social_users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_verification_tokens` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tb_verification_tokens_token_key`(`token`),
    UNIQUE INDEX `tb_verification_tokens_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_artist_informations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_artist_aliases` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `artistId` INTEGER NOT NULL,
    `alias` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tb_artist_aliases_artistId_alias_key`(`artistId`, `alias`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_song_levels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `songId` INTEGER NOT NULL,
    `versionId` INTEGER NOT NULL,
    `instrumentType` ENUM('GUITAR', 'BASS', 'DRUM', 'OPEN') NOT NULL,
    `difficulty` ENUM('BASIC', 'ADVANCED', 'EXTREME', 'MASTER') NOT NULL,
    `level` DOUBLE NOT NULL,

    UNIQUE INDEX `tb_song_levels_songId_versionId_instrumentType_difficulty_key`(`songId`, `versionId`, `instrumentType`, `difficulty`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `commentType` ENUM('ARTIST', 'SONG', 'VERSION') NOT NULL,
    `targetId` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `userId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `tb_comments_commentType_targetId_idx`(`commentType`, `targetId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NULL DEFAULT '#3b82f6',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tb_tags_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_song_tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `songId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tb_song_tags_songId_tagId_key`(`songId`, `tagId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_user_skill_records` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `songTitle` VARCHAR(191) NOT NULL,
    `instrumentType` ENUM('GUITAR', 'BASS', 'DRUM', 'OPEN') NOT NULL,
    `difficulty` ENUM('BASIC', 'ADVANCED', 'EXTREME', 'MASTER') NOT NULL,
    `achievement` DOUBLE NOT NULL,
    `skillScore` DOUBLE NOT NULL,
    `level` DOUBLE NOT NULL DEFAULT 0,
    `isHot` BOOLEAN NOT NULL DEFAULT false,
    `versionId` INTEGER NOT NULL,
    `playedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `tb_user_skill_records_userId_songTitle_instrumentType_diffic_idx`(`userId`, `songTitle`, `instrumentType`, `difficulty`, `isHot`),
    INDEX `tb_user_skill_records_userId_instrumentType_isHot_idx`(`userId`, `instrumentType`, `isHot`),
    INDEX `tb_user_skill_records_userId_instrumentType_playedAt_idx`(`userId`, `instrumentType`, `playedAt`),
    INDEX `tb_user_skill_records_userId_playedAt_idx`(`userId`, `playedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_user_skill_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `totalSkill` DOUBLE NOT NULL,
    `hotSkill` DOUBLE NOT NULL,
    `otherSkill` DOUBLE NOT NULL,
    `instrumentType` ENUM('GUITAR', 'BASS', 'DRUM', 'OPEN') NOT NULL,
    `recordedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `tb_user_skill_history_userId_instrumentType_recordedAt_idx`(`userId`, `instrumentType`, `recordedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `startedAt` DATETIME(3) NOT NULL,
    `endedAt` DATETIME(3) NULL,
    `eventType` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_song_informations` ADD CONSTRAINT `tb_song_informations_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `tb_artist_informations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_users` ADD CONSTRAINT `tb_users_socialUserId_fkey` FOREIGN KEY (`socialUserId`) REFERENCES `tb_social_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_accounts` ADD CONSTRAINT `tb_accounts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tb_social_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_sessions` ADD CONSTRAINT `tb_sessions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tb_social_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_artist_aliases` ADD CONSTRAINT `tb_artist_aliases_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `tb_artist_informations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_song_levels` ADD CONSTRAINT `tb_song_levels_songId_fkey` FOREIGN KEY (`songId`) REFERENCES `tb_song_informations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_song_levels` ADD CONSTRAINT `tb_song_levels_versionId_fkey` FOREIGN KEY (`versionId`) REFERENCES `tb_gitadora_versions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_comments` ADD CONSTRAINT `tb_comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tb_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_song_tags` ADD CONSTRAINT `tb_song_tags_songId_fkey` FOREIGN KEY (`songId`) REFERENCES `tb_song_informations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_song_tags` ADD CONSTRAINT `tb_song_tags_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `tb_tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_user_skill_records` ADD CONSTRAINT `tb_user_skill_records_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tb_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_user_skill_records` ADD CONSTRAINT `tb_user_skill_records_versionId_fkey` FOREIGN KEY (`versionId`) REFERENCES `tb_gitadora_versions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_user_skill_history` ADD CONSTRAINT `tb_user_skill_history_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tb_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
