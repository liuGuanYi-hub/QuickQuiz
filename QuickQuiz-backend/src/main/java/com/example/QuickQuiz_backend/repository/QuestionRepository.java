package com.example.QuickQuiz_backend.repository;

import com.example.QuickQuiz_backend.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findByContentContaining(String content, Pageable pageable);
}
