package com.example.QuickQuiz_backend.repository;

import com.example.QuickQuiz_backend.entity.ExerciseDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseDetailRepository extends JpaRepository<ExerciseDetail, Long> {
    List<ExerciseDetail> findByRecordId(Long recordId);
}
