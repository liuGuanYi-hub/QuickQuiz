package com.example.QuickQuiz_backend.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ExerciseRecordDto {
    private Long id;
    private Integer questionCount;
    private Integer correctCount;
    private BigDecimal score;
    private Integer durationSeconds;
    private LocalDateTime createdAt;
    private List<QuestionResultDto> results;

    @Data
    @Builder
    public static class QuestionResultDto {
        private Long questionId;
        private String content;
        private String questionType;
        private Boolean isCorrect;
        private String userAnswer;
        private String correctAnswer;
    }
}
