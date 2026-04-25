-- QuickQuiz V1: 初始数据库结构
-- 创建时间: 2026-04-25

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'USER'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 题目表（单表继承）
CREATE TABLE IF NOT EXISTS questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(1000) NOT NULL,
    dtype VARCHAR(20) NOT NULL DEFAULT 'SINGLE_CHOICE',
    difficulty INT DEFAULT 3,
    answer VARCHAR(500),
    question_type VARCHAR(20) GENERATED ALWAYS AS (
        CASE dtype
            WHEN 'SINGLE_CHOICE' THEN 'SINGLE_CHOICE'
            WHEN 'MULTIPLE_CHOICE' THEN 'MULTIPLE_CHOICE'
            WHEN 'TRUE_FALSE' THEN 'TRUE_FALSE'
            ELSE dtype
        END
    ) STORED,
    CONSTRAINT chk_dtype CHECK (dtype IN ('SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'TRUE_FALSE'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 题目选项表
CREATE TABLE IF NOT EXISTS question_options (
    question_id BIGINT NOT NULL,
    option_text VARCHAR(500),
    CONSTRAINT fk_options_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 练习记录表
CREATE TABLE IF NOT EXISTS exercise_records (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    question_count INT NOT NULL DEFAULT 0,
    correct_count INT NOT NULL DEFAULT 0,
    score DECIMAL(5,2),
    duration_seconds INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_record_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 练习详情表
CREATE TABLE IF NOT EXISTS exercise_details (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    record_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    user_answer VARCHAR(500),
    is_correct BOOLEAN,
    CONSTRAINT fk_detail_record FOREIGN KEY (record_id) REFERENCES exercise_records(id) ON DELETE CASCADE,
    CONSTRAINT fk_detail_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 错题本表
CREATE TABLE IF NOT EXISTS wrong_questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    wrong_count INT NOT NULL DEFAULT 1,
    last_wrong_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mastered BOOLEAN DEFAULT FALSE,
    consecutive_correct INT DEFAULT 0,
    CONSTRAINT fk_wrong_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_wrong_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    CONSTRAINT uk_user_question UNIQUE (user_id, question_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 索引
CREATE INDEX idx_questions_content ON questions(content(255));
CREATE INDEX idx_records_user ON exercise_records(user_id);
CREATE INDEX idx_records_created ON exercise_records(created_at);
CREATE INDEX idx_wrong_user_mastered ON wrong_questions(user_id, mastered);
