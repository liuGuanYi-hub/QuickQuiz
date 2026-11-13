package com.example.QuickQuiz_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        name = "web_exam_wrong_questions",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_static_exam_wrong_user_exam_question",
                columnNames = {"user_id", "exam_key", "static_question_id"}
        )
)
public class WebExamWrongQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Builder.Default
    @Column(name = "exam_key", nullable = false, length = 40)
    private String examKey = "WEB_FRONTEND";

    @Column(name = "static_question_id", nullable = false, length = 64)
    private String staticQuestionId;

    private Integer chapter;

    @Column(length = 100)
    private String chapterTitle;

    @Column(nullable = false, length = 40)
    private String questionType;

    @Column(nullable = false, length = 2000)
    private String content;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String optionsJson;

    @Column(length = 1000)
    private String correctAnswer;

    @Column(length = 2000)
    private String analysis;

    @Column(length = 2000)
    private String lastWrongAnswer;

    @Builder.Default
    private Integer wrongCount = 1;

    private LocalDateTime lastWrongAt;

    @Builder.Default
    private Boolean mastered = false;

    @Builder.Default
    private Integer consecutiveCorrect = 0;

    @PrePersist
    public void prePersist() {
        if (examKey == null || examKey.isBlank()) {
            examKey = "WEB_FRONTEND";
        }
        if (lastWrongAt == null) {
            lastWrongAt = LocalDateTime.now();
        }
    }
}
