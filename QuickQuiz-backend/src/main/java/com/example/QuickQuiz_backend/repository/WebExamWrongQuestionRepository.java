package com.example.QuickQuiz_backend.repository;

import com.example.QuickQuiz_backend.entity.WebExamWrongQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WebExamWrongQuestionRepository extends JpaRepository<WebExamWrongQuestion, Long> {
    List<WebExamWrongQuestion> findByUserIdOrderByLastWrongAtDesc(Long userId);

    List<WebExamWrongQuestion> findByUserIdAndMasteredOrderByLastWrongAtDesc(Long userId, Boolean mastered);

    Optional<WebExamWrongQuestion> findByUserIdAndExamKeyAndStaticQuestionId(
            Long userId,
            String examKey,
            String staticQuestionId
    );

    Optional<WebExamWrongQuestion> findByIdAndUserId(Long id, Long userId);

    long countByUserIdAndMasteredFalse(Long userId);

    long countByUserIdAndMasteredTrue(Long userId);
}
