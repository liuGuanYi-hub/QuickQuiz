package com.example.QuickQuiz_backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class SubmitExamRequest {
    private List<QuestionAnswer> answers;
    private Integer durationSeconds;

    @Data
    public static class QuestionAnswer {
        private Long questionId;
        private String userAnswer;
    }
}
