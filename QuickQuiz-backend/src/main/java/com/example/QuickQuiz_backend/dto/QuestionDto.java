package com.example.QuickQuiz_backend.dto;

import com.example.QuickQuiz_backend.entity.QuestionType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class QuestionDto {

    @NotBlank
    @Size(max = 1000)
    private String content;

    @NotNull
    private QuestionType type;

    @Size(max = 20)
    private List<@NotBlank @Size(max = 500) String> options;

    @NotBlank
    @Size(max = 500)
    private String answer;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer difficulty;
}
