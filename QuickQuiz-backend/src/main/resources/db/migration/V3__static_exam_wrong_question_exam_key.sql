ALTER TABLE web_exam_wrong_questions
    ADD COLUMN exam_key VARCHAR(40) NULL AFTER user_id;

UPDATE web_exam_wrong_questions
SET exam_key = 'WEB_FRONTEND'
WHERE exam_key IS NULL OR exam_key = '';

ALTER TABLE web_exam_wrong_questions
    MODIFY COLUMN exam_key VARCHAR(40) NOT NULL;

ALTER TABLE web_exam_wrong_questions
    DROP INDEX uk_web_exam_wrong_user_question;

ALTER TABLE web_exam_wrong_questions
    ADD CONSTRAINT uk_static_exam_wrong_user_exam_question
        UNIQUE (user_id, exam_key, static_question_id);

