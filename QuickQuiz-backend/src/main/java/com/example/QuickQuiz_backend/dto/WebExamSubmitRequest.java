package com.example.QuickQuiz_backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.List;

@Data
public class WebExamSubmitRequest {

    @NotEmpty
    @Size(max = 41)
    private List<@Valid AnswerSnapshot> answers;

    @NotNull
    @Min(0)
    @Max(86400)
    private Integer durationSeconds;

    @NotNull
    @Min(0)
    @Max(20)
    private Integer operationScore;

    @Data
    public static class AnswerSnapshot {
        @NotBlank
        @Size(max = 64)
        private String questionId;

        @NotNull
        @Min(1)
        @Max(14)
        private Integer chapter;

        @NotBlank
        @Size(max = 100)
        private String chapterTitle;

        @NotBlank
        @Size(max = 40)
        private String questionType;

        @NotBlank
        @Size(max = 2000)
        private String content;

        @Size(max = 6)
        private List<@Size(max = 500) String> options;

        @Size(max = 2000)
        private String userAnswer;

        @Size(max = 1000)
        private String correctAnswer;

        @Size(max = 2000)
        private String analysis;

        @NotNull
        private Boolean correct;

        @NotNull
        @Min(0)
        @Max(2)
        private Integer earnedScore;
    }
}
