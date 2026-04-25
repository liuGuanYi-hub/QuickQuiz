package com.example.QuickQuiz_backend.service;

import com.example.QuickQuiz_backend.dto.DailyStatsDto;
import com.example.QuickQuiz_backend.dto.UserStatsResponse;
import com.example.QuickQuiz_backend.entity.*;
import com.example.QuickQuiz_backend.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class UserStatsServiceTest {

    @Autowired
    private UserStatsService userStatsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExerciseRecordRepository exerciseRecordRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private WrongQuestionRepository wrongQuestionRepository;

    private User testUser;

    @BeforeEach
    void setUp() {
        exerciseRecordRepository.deleteAll();
        wrongQuestionRepository.deleteAll();
        questionRepository.deleteAll();
        userRepository.deleteAll();

        testUser = userRepository.save(User.builder()
                .username("statsuser")
                .password("pass")
                .role(Role.USER)
                .build());
    }

    @Test
    void shouldCalculateOverallAccuracy() {
        Question q1 = questionRepository.save(SingleChoiceQuestion.builder()
                .content("Q1").answer("A").difficulty(1)
                .options(java.util.List.of("A", "B", "C", "D"))
                .type(QuestionType.SINGLE_CHOICE).build());

        // 练习1：3对/5题 = 60%
        ExerciseRecord r1 = exerciseRecordRepository.save(ExerciseRecord.builder()
                .user(testUser)
                .questionCount(5)
                .correctCount(3)
                .score(BigDecimal.valueOf(60))
                .durationSeconds(120)
                .createdAt(LocalDateTime.now().minusDays(2))
                .build());
        r1.getDetails().add(ExerciseDetail.builder().record(r1).question(q1).userAnswer("A").isCorrect(true).build());

        // 练习2：5对/5题 = 100%
        ExerciseRecord r2 = exerciseRecordRepository.save(ExerciseRecord.builder()
                .user(testUser)
                .questionCount(5)
                .correctCount(5)
                .score(BigDecimal.valueOf(100))
                .durationSeconds(60)
                .createdAt(LocalDateTime.now().minusDays(1))
                .build());

        UserStatsResponse stats = userStatsService.getUserStats(testUser.getId());

        assertEquals(10, stats.getTotalQuestions());
        assertEquals(8, stats.getTotalCorrect());
        assertEquals(BigDecimal.valueOf(80.0).setScale(1), stats.getOverallAccuracy());
        assertEquals(2, stats.getTotalExercises());
        assertEquals(180, stats.getTotalTimeSeconds());
    }

    @Test
    void shouldCalculateStreak() {
        // 连续3天做题
        for (int i = 3; i >= 1; i--) {
            exerciseRecordRepository.save(ExerciseRecord.builder()
                    .user(testUser)
                    .questionCount(5)
                    .correctCount(3)
                    .score(BigDecimal.valueOf(60))
                    .createdAt(LocalDateTime.now().minusDays(i))
                    .build());
        }

        UserStatsResponse stats = userStatsService.getUserStats(testUser.getId());

        // 今天(0)开始，往前数3天连续
        assertTrue(stats.getCurrentStreak() >= 1); // 至少今天有或昨天有
    }

    @Test
    void shouldReturnEmptyStatsForNewUser() {
        UserStatsResponse stats = userStatsService.getUserStats(testUser.getId());

        assertEquals(0L, stats.getTotalQuestions());
        assertEquals(BigDecimal.ZERO, stats.getOverallAccuracy());
        assertEquals(0L, stats.getCurrentStreak());
        assertEquals(0L, stats.getWrongCount());
        assertEquals(0L, stats.getMasteredCount());
    }

    @Test
    void shouldGetDailyStats() {
        for (int i = 6; i >= 0; i--) {
            exerciseRecordRepository.save(ExerciseRecord.builder()
                    .user(testUser)
                    .questionCount(10)
                    .correctCount(8)
                    .score(BigDecimal.valueOf(80))
                    .createdAt(LocalDateTime.now().minusDays(i))
                    .build());
        }

        var daily = userStatsService.getDailyStats(testUser.getId(), 7);

        assertEquals(7, daily.size());
        assertTrue(daily.stream().allMatch(d -> d.getQuestionsCount() == 10));
        assertTrue(daily.stream().allMatch(d -> d.getAccuracy().compareTo(BigDecimal.ZERO) > 0));
    }

    @Test
    void shouldCalculateTypeAccuracy() {
        Question single = questionRepository.save(SingleChoiceQuestion.builder()
                .content("Single").answer("A").difficulty(1)
                .options(java.util.List.of("A", "B", "C", "D"))
                .type(QuestionType.SINGLE_CHOICE).build());

        ExerciseRecord r = exerciseRecordRepository.save(ExerciseRecord.builder()
                .user(testUser)
                .questionCount(1)
                .correctCount(1)
                .score(BigDecimal.valueOf(100))
                .createdAt(LocalDateTime.now())
                .build());
        r.getDetails().add(ExerciseDetail.builder().record(r).question(single).userAnswer("A").isCorrect(true).build());
        exerciseRecordRepository.save(r);

        var typeStats = userStatsService.getTypeAccuracy(testUser.getId());

        assertFalse(typeStats.isEmpty());
        assertTrue(typeStats.stream().anyMatch(t -> t.getType().equals("SINGLE_CHOICE")));
    }
}
