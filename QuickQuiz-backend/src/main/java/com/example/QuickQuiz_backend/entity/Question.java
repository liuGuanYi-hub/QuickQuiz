package com.example.QuickQuiz_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@Entity
@Table(name = "questions")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dtype", discriminatorType = DiscriminatorType.STRING)
// 1. 删掉 sealed 和 permits，改为传统的 abstract class
public abstract class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 1000)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "question_type", insertable = false, updatable = false)
    private QuestionType type;

    private Integer difficulty;

    private String answer;

    @ElementCollection
    @CollectionTable(name = "question_options", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "option_text")
    private List<String> options;

    @Entity
    @DiscriminatorValue("TRUE_FALSE")
    @SuperBuilder
    @NoArgsConstructor
    // 2. 删掉 final，或者保留但确保它不再是 sealed 的子类
    public static class TrueFalseQuestion extends Question {
    }
}
