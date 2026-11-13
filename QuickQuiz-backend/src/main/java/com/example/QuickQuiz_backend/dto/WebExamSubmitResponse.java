package com.example.QuickQuiz_backend.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class WebExamSubmitResponse {
    private Long recordId;
    private Integer questionCount;
    private Integer correctCount;
    private BigDecimal score;
    private Integer durationSeconds;
    private Integer wrongQuestionsSaved;
}
