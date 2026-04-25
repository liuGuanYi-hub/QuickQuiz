package com.example.QuickQuiz_backend.dto;

import com.example.QuickQuiz_backend.entity.QuestionType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AiGenerateRequest {

    @NotBlank(message = "材料内容不能为空")
    private String material;

    @Min(1)
    @Max(50)
    private int count = 5;

    @NotNull
    private QuestionType type = QuestionType.SINGLE_CHOICE;
}
