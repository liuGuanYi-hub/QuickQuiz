package com.example.QuickQuiz_backend.repository;

import com.example.QuickQuiz_backend.entity.WrongQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WrongQuestionRepository extends JpaRepository<WrongQuestion, Long> {
    List<WrongQuestion> findByUserIdAndMasteredFalseOrderByLastWrongAtDesc(Long userId);

    List<WrongQuestion> findByUserIdOrderByLastWrongAtDesc(Long userId);

    Optional<WrongQuestion> findByUserIdAndQuestionId(Long userId, Long questionId);

    long countByUserIdAndMasteredFalse(Long userId);
}
