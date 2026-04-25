package com.example.QuickQuiz_backend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class WrongQuestionDto {
    private Long id;
    private Long questionId;
    private String content;
    private String questionType;
    private List<String> options;
    private String correctAnswer;
    private String lastWrongAnswer;
    private Integer wrongCount;
    private Integer consecutiveCorrect;
    private Integer targetCorrect;
    private LocalDateTime lastWrongAt;
    private Boolean mastered;
}
