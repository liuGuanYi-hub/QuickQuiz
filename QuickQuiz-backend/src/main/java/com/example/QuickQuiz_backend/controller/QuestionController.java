package com.example.QuickQuiz_backend.controller;

import com.example.QuickQuiz_backend.dto.BatchQuestionRequest;
import com.example.QuickQuiz_backend.dto.QuestionDto;
import com.example.QuickQuiz_backend.entity.MultipleChoiceQuestion;
import com.example.QuickQuiz_backend.entity.Question;
import com.example.QuickQuiz_backend.entity.QuestionType;
import com.example.QuickQuiz_backend.entity.SingleChoiceQuestion;
import com.example.QuickQuiz_backend.repository.QuestionRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionRepository questionRepository;

    @GetMapping
    public ResponseEntity<Page<Question>> getAllQuestions(
            @RequestParam(required = false) String search,
            Pageable pageable) {
        if (search != null && !search.isEmpty()) {
            return ResponseEntity.ok(questionRepository.findByContentContaining(search, pageable));
        }
        return ResponseEntity.ok(questionRepository.findAll(pageable));
    }

    @PostMapping
    public ResponseEntity<Question> createQuestion(@Valid @RequestBody QuestionDto dto) {
        Question question = buildQuestionFromDto(dto);
        return ResponseEntity.ok(questionRepository.save(question));
    }

    @PostMapping("/batch")
    public ResponseEntity<List<Question>> createQuestionsBatch(@Valid @RequestBody BatchQuestionRequest request) {
        List<Question> saved = new ArrayList<>();
        for (QuestionDto dto : request.getQuestions()) {
            saved.add(questionRepository.save(buildQuestionFromDto(dto)));
        }
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestion(@PathVariable Long id) {
        return questionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(
            @PathVariable Long id,
            @Valid @RequestBody QuestionDto dto) {
        return questionRepository.findById(id)
                .map(existing -> {
                    existing.setContent(dto.getContent());
                    existing.setDifficulty(dto.getDifficulty());
                    existing.setAnswer(dto.getAnswer());
                    if (dto.getType() != QuestionType.TRUE_FALSE) {
                        existing.setOptions(dto.getOptions());
                    }
                    return ResponseEntity.ok(questionRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private Question buildQuestionFromDto(QuestionDto dto) {
        validateQuestionDto(dto);
        return switch (dto.getType()) {
            case SINGLE_CHOICE -> SingleChoiceQuestion.builder()
                    .type(QuestionType.SINGLE_CHOICE)
                    .content(dto.getContent())
                    .options(dto.getOptions())
                    .answer(dto.getAnswer())
                    .difficulty(dto.getDifficulty())
                    .build();
            case MULTIPLE_CHOICE -> MultipleChoiceQuestion.builder()
                    .type(QuestionType.MULTIPLE_CHOICE)
                    .content(dto.getContent())
                    .options(dto.getOptions())
                    .answer(dto.getAnswer())
                    .difficulty(dto.getDifficulty())
                    .build();
            case TRUE_FALSE -> Question.TrueFalseQuestion.builder()
                    .type(QuestionType.TRUE_FALSE)
                    .content(dto.getContent())
                    .options(List.of("True", "False"))
                    .answer(dto.getAnswer())
                    .difficulty(dto.getDifficulty())
                    .build();
        };
    }

    private void validateQuestionDto(QuestionDto dto) {
        switch (dto.getType()) {
            case SINGLE_CHOICE, MULTIPLE_CHOICE -> {
                if (dto.getOptions() == null || dto.getOptions().isEmpty()) {
                    throw new IllegalArgumentException("选择题必须包含选项列表");
                }
            }
            case TRUE_FALSE -> {
                // options ignored; fixed True/False
            }
        }
    }
}
