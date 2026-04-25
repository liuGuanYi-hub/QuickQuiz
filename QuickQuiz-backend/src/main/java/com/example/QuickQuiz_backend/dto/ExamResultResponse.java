package com.example.QuickQuiz_backend.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class ExamResultResponse {
    private Long recordId;
    private Integer questionCount;
    private Integer correctCount;
    private BigDecimal score;
    private Integer durationSeconds;
    private List<QuestionResult> results;

    @Data
    @Builder
    public static class QuestionResult {
        private Long questionId;
        private String content;
        private String questionType;
        private List<String> options;
        private String correctAnswer;
        private String userAnswer;
        private Boolean isCorrect;
        private Boolean addedToWrongBook;
    }
}
