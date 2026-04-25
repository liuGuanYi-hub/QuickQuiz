package com.example.QuickQuiz_backend.repository;

import com.example.QuickQuiz_backend.entity.ExerciseRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRecordRepository extends JpaRepository<ExerciseRecord, Long> {
    List<ExerciseRecord> findByUserIdOrderByCreatedAtDesc(Long userId);
}
