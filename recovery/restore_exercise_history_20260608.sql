-- Restore the exercise history deleted at 2026-06-08 14:56:51.
-- Source: MySQL binlog YLXG-bin.000072, positions 7347-15433.
-- Review this file before execution. It writes 5 exercise records and 50 details.

USE quickquiz;

START TRANSACTION;

INSERT INTO exercise_records
  (id, correct_count, created_at, duration_seconds, question_count, score, user_id)
VALUES
  (1, 2, '2026-05-28 06:54:35.930134', 60, 10, 20.00, 3),
  (2, 8, '2026-05-28 06:57:33.004485', 94, 10, 80.00, 2),
  (3, 6, '2026-05-28 08:52:06.975002', 105, 10, 60.00, 2),
  (4, 7, '2026-05-28 09:05:26.903072', 83, 10, 70.00, 2),
  (5, 8, '2026-05-28 09:16:31.880139', 39, 10, 80.00, 2);

INSERT INTO exercise_details
  (id, is_correct, user_answer, question_id, record_id)
VALUES
  (1, b'0', 'A', 2, 1),
  (2, b'0', 'A', 10, 1),
  (3, b'0', 'A', 3, 1),
  (4, b'0', 'A', 1, 1),
  (5, b'1', 'A', 4, 1),
  (6, b'0', 'A', 7, 1),
  (7, b'1', 'A', 6, 1),
  (8, b'0', 'A', 8, 1),
  (9, b'0', 'A', 5, 1),
  (10, b'0', 'A', 9, 1),
  (11, b'1', 'B', 5, 2),
  (12, b'1', 'A,B,C', 8, 2),
  (13, b'1', 'A', 6, 2),
  (14, b'1', 'C', 2, 2),
  (15, b'1', 'C', 3, 2),
  (16, b'0', 'A', 9, 2),
  (17, b'1', 'C', 1, 2),
  (18, b'1', 'A,B,C', 7, 2),
  (19, b'1', 'A', 4, 2),
  (20, b'0', 'A', 10, 2),
  (21, b'1', 'A,B,C', 7, 3),
  (22, b'1', 'C', 24, 3),
  (23, b'0', 'A', 10, 3),
  (24, b'1', 'C', 21, 3),
  (25, b'0', 'D', 22, 3),
  (26, b'1', 'A', 28, 3),
  (27, b'0', 'D', 20, 3),
  (28, b'1', 'C', 2, 3),
  (29, b'0', 'D', 19, 3),
  (30, b'1', 'C', 3, 3),
  (31, b'0', 'A', 9, 4),
  (32, b'1', 'C', 1, 4),
  (33, b'0', 'A', 10, 4),
  (34, b'1', 'C', 21, 4),
  (35, b'1', 'B', 15, 4),
  (36, b'1', 'A', 28, 4),
  (37, b'1', 'A,B,C', 7, 4),
  (38, b'0', 'A', 24, 4),
  (39, b'1', 'B', 25, 4),
  (40, b'1', 'A', 6, 4),
  (41, b'1', 'A', 28, 5),
  (42, b'1', 'C', 24, 5),
  (43, b'1', 'A', 6, 5),
  (44, b'1', 'C', 3, 5),
  (45, b'1', 'B', 22, 5),
  (46, b'0', 'D', 26, 5),
  (47, b'1', 'A,B,C', 7, 5),
  (48, b'1', 'A', 4, 5),
  (49, b'0', 'D', 20, 5),
  (50, b'1', 'B', 15, 5);

SELECT COUNT(*) AS restored_records
FROM exercise_records
WHERE id BETWEEN 1 AND 5;

SELECT COUNT(*) AS restored_details
FROM exercise_details
WHERE id BETWEEN 1 AND 50;

COMMIT;
