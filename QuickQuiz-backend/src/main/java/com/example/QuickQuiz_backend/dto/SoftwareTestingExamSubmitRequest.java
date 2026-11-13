package com.example.QuickQuiz_backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class SoftwareTestingExamSubmitRequest {

    @NotEmpty
    @Size(max = 10)
    private List<@Valid AnswerSnapshot> answers;

    @NotNull
    @Min(0)
    @Max(86400)
    private Integer durationSeconds;

    @Data
    public static class AnswerSnapshot {
        @NotBlank
        @Size(max = 64)
        private String questionId;

        @NotNull
        @Min(1)
        @Max(52)
        private Integer questionNumber;

        @NotBlank
        @Size(max = 64)
        private String setId;

        @NotNull
        @Min(1)
        @Max(9)
        private Integer setOrder;

        @NotBlank
        @Size(max = 100)
        private String setTitle;

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

        @Size(max = 2000)
        private String correctAnswer;

        @Size(max = 2000)
        private String analysis;

        @NotNull
        private Boolean correct;

        @NotNull
        private Boolean selfAssessed;
    }
}
