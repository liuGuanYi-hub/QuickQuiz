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
@Table(name = "wrong_questions")
public class WrongQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @Builder.Default
    private Integer wrongCount = 1;

    private LocalDateTime lastWrongAt;

    @Builder.Default
    private Boolean mastered = false;

    @Builder.Default
    private Integer consecutiveCorrect = 0;

    @PrePersist
    public void prePersist() {
        if (lastWrongAt == null) {
            lastWrongAt = LocalDateTime.now();
        }
    }
}
