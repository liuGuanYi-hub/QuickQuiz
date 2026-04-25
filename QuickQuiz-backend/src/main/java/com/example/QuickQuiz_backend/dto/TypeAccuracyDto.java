package com.example.QuickQuiz_backend.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class TypeAccuracyDto {
    private String type;
    private String label;
    private Integer total;
    private Integer correct;
    private BigDecimal accuracy;
}
