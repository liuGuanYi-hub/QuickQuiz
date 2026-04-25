package com.example.QuickQuiz_backend.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class UserStatsResponse {
    private Long totalQuestions;
    private Long totalExercises;
    private Long totalCorrect;
    private BigDecimal overallAccuracy;
    private Long totalTimeSeconds;
    private Long currentStreak;       // 连续打卡天数
    private Long longestStreak;       // 最长连续天数
    private Long masteredCount;       // 已掌握题数
    private Long wrongCount;          // 错题本数量
    private Long todayQuestions;       // 今日做题数
    private Long todayCorrect;        // 今日正确数
    private BigDecimal todayAccuracy; // 今日正确率
}
