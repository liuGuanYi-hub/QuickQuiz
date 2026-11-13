CREATE TABLE IF NOT EXISTS web_exam_wrong_questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    static_question_id VARCHAR(64) NOT NULL,
    chapter INT,
    chapter_title VARCHAR(100),
    question_type VARCHAR(40) NOT NULL,
    content VARCHAR(2000) NOT NULL,
    options_json TEXT,
    correct_answer VARCHAR(1000),
    analysis VARCHAR(2000),
    last_wrong_answer VARCHAR(2000),
    wrong_count INT NOT NULL DEFAULT 1,
    last_wrong_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mastered BOOLEAN DEFAULT FALSE,
    consecutive_correct INT DEFAULT 0,
    CONSTRAINT fk_web_exam_wrong_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uk_web_exam_wrong_user_question UNIQUE (user_id, static_question_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_web_exam_wrong_user_mastered
    ON web_exam_wrong_questions(user_id, mastered);
