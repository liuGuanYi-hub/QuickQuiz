package com.example.QuickQuiz_backend.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class DailyStatsDto {
    private String date;          // YYYY-MM-DD
    private Integer questionsCount;
    private Integer correctCount;
    private BigDecimal accuracy;
    private Integer totalTimeSeconds;
}
