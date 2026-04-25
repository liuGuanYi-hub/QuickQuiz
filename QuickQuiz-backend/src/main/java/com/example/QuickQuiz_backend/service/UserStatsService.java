package com.example.QuickQuiz_backend.service;

import com.example.QuickQuiz_backend.dto.DailyStatsDto;
import com.example.QuickQuiz_backend.dto.ExerciseRecordDto;
import com.example.QuickQuiz_backend.dto.TypeAccuracyDto;
import com.example.QuickQuiz_backend.dto.UserStatsResponse;
import com.example.QuickQuiz_backend.entity.*;
import com.example.QuickQuiz_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserStatsService {

    private final ExerciseRecordRepository exerciseRecordRepository;
    private final ExerciseDetailRepository exerciseDetailRepository;
    private final QuestionRepository questionRepository;
    private final WrongQuestionRepository wrongQuestionRepository;
    private final UserRepository userRepository;

    public UserStatsResponse getUserStats(Long userId) {
        List<ExerciseRecord> records = exerciseRecordRepository.findByUserIdOrderByCreatedAtDesc(userId);

        long totalQuestions = records.stream().mapToLong(ExerciseRecord::getQuestionCount).sum();
        long totalCorrect = records.stream().mapToLong(r -> r.getCorrectCount() != null ? r.getCorrectCount() : 0).sum();
        long totalTime = records.stream().mapToLong(r -> r.getDurationSeconds() != null ? r.getDurationSeconds() : 0).sum();

        BigDecimal overallAccuracy = totalQuestions > 0
                ? BigDecimal.valueOf(totalCorrect * 100.0 / totalQuestions).setScale(1, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        // 打卡天数
        long currentStreak = calcCurrentStreak(records);
        long longestStreak = calcLongestStreak(records);

        // 已掌握 / 错题数
        long masteredCount = wrongQuestionRepository.findByUserIdAndMasteredTrue(userId).size();
        long wrongCount = wrongQuestionRepository.countByUserIdAndMasteredFalse(userId);

        // 今日数据
        LocalDateTime todayStart = LocalDate.now().atStartOfDay();
        LocalDateTime todayEnd = todayStart.plusDays(1);
        var todayRecords = records.stream()
                .filter(r -> r.getCreatedAt() != null &&
                        !r.getCreatedAt().isBefore(todayStart) && r.getCreatedAt().isBefore(todayEnd))
                .toList();

        long todayQuestions = todayRecords.stream().mapToLong(r -> r.getQuestionCount() != null ? r.getQuestionCount() : 0).sum();
        long todayCorrect = todayRecords.stream().mapToLong(r -> r.getCorrectCount() != null ? r.getCorrectCount() : 0).sum();
        BigDecimal todayAccuracy = todayQuestions > 0
                ? BigDecimal.valueOf(todayCorrect * 100.0 / todayQuestions).setScale(1, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        return UserStatsResponse.builder()
                .totalQuestions(totalQuestions)
                .totalExercises((long) records.size())
                .totalCorrect(totalCorrect)
                .overallAccuracy(overallAccuracy)
                .totalTimeSeconds(totalTime)
                .currentStreak(currentStreak)
                .longestStreak(longestStreak)
                .masteredCount(masteredCount)
                .wrongCount(wrongCount)
                .todayQuestions(todayQuestions)
                .todayCorrect(todayCorrect)
                .todayAccuracy(todayAccuracy)
                .build();
    }

    /**
     * 获取最近N天的每日统计数据（用于折线图）
     */
    public List<DailyStatsDto> getDailyStats(Long userId, int days) {
        LocalDateTime start = LocalDate.now().minusDays(days - 1).atStartOfDay();

        List<ExerciseRecord> records = exerciseRecordRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .filter(r -> r.getCreatedAt() != null && !r.getCreatedAt().isBefore(start))
                .toList();

        // 按日期分组
        Map<String, List<ExerciseRecord>> byDate = new TreeMap<>();
        for (ExerciseRecord r : records) {
            String dateKey = r.getCreatedAt().toLocalDate().toString();
            byDate.computeIfAbsent(dateKey, k -> new ArrayList<>()).add(r);
        }

        List<DailyStatsDto> result = new ArrayList<>();
        for (int i = days - 1; i >= 0; i--) {
            String date = LocalDate.now().minusDays(i).toString();
            List<ExerciseRecord> dayRecords = byDate.getOrDefault(date, Collections.emptyList());
            int qCount = dayRecords.stream().mapToInt(r -> r.getQuestionCount() != null ? r.getQuestionCount() : 0).sum();
            int correct = dayRecords.stream().mapToInt(r -> r.getCorrectCount() != null ? r.getCorrectCount() : 0).sum();
            int time = dayRecords.stream().mapToInt(r -> r.getDurationSeconds() != null ? r.getDurationSeconds() : 0).sum();
            BigDecimal acc = qCount > 0
                    ? BigDecimal.valueOf(correct * 100.0 / qCount).setScale(1, RoundingMode.HALF_UP)
                    : BigDecimal.ZERO;
            result.add(DailyStatsDto.builder()
                    .date(date)
                    .questionsCount(qCount)
                    .correctCount(correct)
                    .accuracy(acc)
                    .totalTimeSeconds(time)
                    .build());
        }
        return result;
    }

    /**
     * 分页获取练习记录列表（不含详情）
     */
    public Page<ExerciseRecordDto> getRecordList(Long userId, int page, int size) {
        Page<ExerciseRecord> records = exerciseRecordRepository
                .findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
        return records.map(this::toRecordDto);
    }

    private ExerciseRecordDto toRecordDto(ExerciseRecord r) {
        return ExerciseRecordDto.builder()
                .id(r.getId())
                .questionCount(r.getQuestionCount())
                .correctCount(r.getCorrectCount())
                .score(r.getScore())
                .durationSeconds(r.getDurationSeconds())
                .createdAt(r.getCreatedAt())
                .build();
    }

    /**
     * 获取单条练习记录的完整详情
     */
    public ExerciseRecordDto getRecordDetail(Long userId, Long recordId) {
        ExerciseRecord record = exerciseRecordRepository.findById(recordId)
                .filter(r -> r.getUser().getId().equals(userId))
                .orElseThrow(() -> new RuntimeException("记录不存在"));

        List<ExerciseRecordDto.QuestionResultDto> results = record.getDetails().stream()
                .map(d -> ExerciseRecordDto.QuestionResultDto.builder()
                        .questionId(d.getQuestion().getId())
                        .content(d.getQuestion().getContent())
                        .questionType(d.getQuestion().getType().name())
                        .isCorrect(d.getIsCorrect())
                        .userAnswer(d.getUserAnswer())
                        .correctAnswer(d.getQuestion().getAnswer())
                        .build())
                .collect(Collectors.toList());

        return ExerciseRecordDto.builder()
                .id(record.getId())
                .questionCount(record.getQuestionCount())
                .correctCount(record.getCorrectCount())
                .score(record.getScore())
                .durationSeconds(record.getDurationSeconds())
                .createdAt(record.getCreatedAt())
                .results(results)
                .build();
    }

    private long calcCurrentStreak(List<ExerciseRecord> records) {
        if (records.isEmpty()) return 0;
        Set<LocalDate> exerciseDates = records.stream()
                .filter(r -> r.getCreatedAt() != null)
                .map(r -> r.getCreatedAt().toLocalDate())
                .collect(Collectors.toSet());

        long streak = 0;
        LocalDate date = LocalDate.now();
        // 今天如果没做题，看昨天有没有（允许一天缓冲）
        if (!exerciseDates.contains(date)) {
            date = date.minusDays(1);
            if (!exerciseDates.contains(date)) return 0;
        }
        while (exerciseDates.contains(date)) {
            streak++;
            date = date.minusDays(1);
        }
        return streak;
    }

    private long calcLongestStreak(List<ExerciseRecord> records) {
        if (records.isEmpty()) return 0;
        Set<LocalDate> exerciseDates = records.stream()
                .filter(r -> r.getCreatedAt() != null)
                .map(r -> r.getCreatedAt().toLocalDate())
                .collect(Collectors.toSet());

        long maxStreak = 0;
        long currentStreak = 0;
        LocalDate prev = null;

        for (LocalDate date : exerciseDates.stream().sorted().toList()) {
            if (prev == null || ChronoUnit.DAYS.between(prev, date) == 1) {
                currentStreak++;
            } else {
                currentStreak = 1;
            }
            maxStreak = Math.max(maxStreak, currentStreak);
            prev = date;
        }
        return maxStreak;
    }

    /**
     * 按题型统计正确率（用于雷达图）
     */
    public List<TypeAccuracyDto> getTypeAccuracy(Long userId) {
        List<ExerciseRecord> records = exerciseRecordRepository.findByUserIdOrderByCreatedAtDesc(userId);

        Map<QuestionType, TypeCounter> counterMap = new EnumMap<>(QuestionType.class);
        for (QuestionType qt : QuestionType.values()) {
            counterMap.put(qt, new TypeCounter());
        }

        for (ExerciseRecord record : records) {
            for (ExerciseDetail detail : record.getDetails()) {
                QuestionType qt = detail.getQuestion().getType();
                TypeCounter tc = counterMap.get(qt);
                if (tc == null) continue;
                tc.total++;
                if (Boolean.TRUE.equals(detail.getIsCorrect())) tc.correct++;
            }
        }

        return counterMap.entrySet().stream()
                .filter(e -> e.getValue().total > 0)
                .map(e -> {
                    QuestionType qt = e.getKey();
                    TypeCounter tc = e.getValue();
                    return TypeAccuracyDto.builder()
                            .type(qt.name())
                            .label(qt == QuestionType.SINGLE_CHOICE ? "单选题" :
                                   qt == QuestionType.MULTIPLE_CHOICE ? "多选题" : "判断题")
                            .total(tc.total)
                            .correct(tc.correct)
                            .accuracy(BigDecimal.valueOf(tc.correct * 100.0 / tc.total).setScale(1, RoundingMode.HALF_UP))
                            .build();
                })
                .collect(Collectors.toList());
    }

    private static class TypeCounter {
        int total = 0;
        int correct = 0;
    }
}
