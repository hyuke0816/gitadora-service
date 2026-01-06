-- 스킬 기록 테이블 단순화 마이그레이션
-- 기존 테이블을 백업하거나, 직접 컬럼을 삭제합니다

-- 1. 먼저 기존 데이터 백업 (필요한 경우)
-- CREATE TABLE tb_user_skill_records_backup AS SELECT * FROM tb_user_skill_records;

-- 2. 새로운 구조로 테이블 재생성
-- 기존 테이블 삭제 (데이터 보존 필요 시 주석 처리)
-- DROP TABLE IF EXISTS tb_user_skill_records;

-- 새로운 테이블 생성
CREATE TABLE IF NOT EXISTS tb_user_skill_records_new (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  songTitle VARCHAR(255) NOT NULL,
  difficulty ENUM('BASIC', 'ADVANCED', 'EXTREME', 'MASTER') NOT NULL,
  achievement FLOAT NOT NULL,
  skillScore FLOAT NOT NULL,
  playedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES tb_users(id) ON DELETE CASCADE,
  INDEX idx_user_song_difficulty (userId, songTitle, difficulty),
  INDEX idx_user_played (userId, playedAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. 기존 데이터 마이그레이션 (곡명, 난이도, 달성률, 스킬점수만 복사)
-- INSERT INTO tb_user_skill_records_new (userId, songTitle, difficulty, achievement, skillScore, playedAt, createdAt, updatedAt)
-- SELECT userId, songTitle, difficulty, achievement, skillScore, playedAt, createdAt, updatedAt
-- FROM tb_user_skill_records
-- WHERE songTitle IS NOT NULL AND difficulty IS NOT NULL;

-- 4. 기존 테이블 삭제 및 새 테이블로 교체
-- DROP TABLE tb_user_skill_records;
-- RENAME TABLE tb_user_skill_records_new TO tb_user_skill_records;
