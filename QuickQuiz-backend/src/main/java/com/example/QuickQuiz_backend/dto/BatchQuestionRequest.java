package com.example.QuickQuiz_backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class BatchQuestionRequest {

    @NotEmpty
    @Size(max = 200)
    private List<@Valid QuestionDto> questions;
}
