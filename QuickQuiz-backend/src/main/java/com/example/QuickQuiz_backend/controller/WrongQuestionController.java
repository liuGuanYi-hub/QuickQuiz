package com.example.QuickQuiz_backend.controller;

import com.example.QuickQuiz_backend.dto.WrongQuestionDto;
import com.example.QuickQuiz_backend.repository.WrongQuestionRepository;
import com.example.QuickQuiz_backend.repository.UserRepository;
import com.example.QuickQuiz_backend.repository.WebExamWrongQuestionRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/wrong-questions")
@RequiredArgsConstructor
@Tag(name = "错题本", description = "错题查看、练习、移除")
public class WrongQuestionController {

    private final WrongQuestionRepository wrongQuestionRepository;
    private final WebExamWrongQuestionRepository webExamWrongQuestionRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    @GetMapping
    @Operation(summary = "获取当前用户的错题列表（支持标签筛选）")
    public ResponseEntity<List<WrongQuestionDto>> getMyWrongQuestions(
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) Boolean mastered,
            @AuthenticationPrincipal UserDetails user) {
        var userEntity = userRepository.findByUsername(user.getUsername()).orElseThrow();
        var wrongQuestions = mastered == null
                ? wrongQuestionRepository.findByUserIdOrderByLastWrongAtDesc(userEntity.getId())
                : mastered
                ? wrongQuestionRepository.findByUserIdAndMasteredTrueOrderByLastWrongAtDesc(userEntity.getId())
                : wrongQuestionRepository.findByUserIdAndMasteredFalseOrderByLastWrongAtDesc(userEntity.getId());
        List<WrongQuestionDto> result = new ArrayList<>(wrongQuestions.stream()
                .map(wrongQuestion -> WrongQuestionDto.builder()
                        .id(wrongQuestion.getId())
                        .questionId(wrongQuestion.getQuestion().getId())
                        .source("QUESTION_BANK")
                        .content(wrongQuestion.getQuestion().getContent())
                        .questionType(wrongQuestion.getQuestion().getType().name())
                        .options(wrongQuestion.getQuestion().getOptions())
                        .correctAnswer(wrongQuestion.getQuestion().getAnswer())
                        .wrongCount(wrongQuestion.getWrongCount())
                        .consecutiveCorrect(wrongQuestion.getConsecutiveCorrect())
                        .targetCorrect(3)
                        .lastWrongAt(wrongQuestion.getLastWrongAt())
                        .mastered(wrongQuestion.getMastered())
                        .build())
                .toList());

        var webWrongQuestions = mastered == null
                ? webExamWrongQuestionRepository.findByUserIdOrderByLastWrongAtDesc(userEntity.getId())
                : webExamWrongQuestionRepository.findByUserIdAndMasteredOrderByLastWrongAtDesc(userEntity.getId(), mastered);
        result.addAll(webWrongQuestions.stream()
                .map(wrongQuestion -> WrongQuestionDto.builder()
                        .id(-wrongQuestion.getId())
                        .source(sourceForExamKey(wrongQuestion.getExamKey()))
                        .examKey(wrongQuestion.getExamKey())
                        .staticQuestionId(wrongQuestion.getStaticQuestionId())
                        .chapter(wrongQuestion.getChapter())
                        .chapterTitle(wrongQuestion.getChapterTitle())
                        .content(wrongQuestion.getContent())
                        .questionType(wrongQuestion.getQuestionType())
                        .options(readOptions(wrongQuestion.getOptionsJson()))
                        .correctAnswer(wrongQuestion.getCorrectAnswer())
                        .analysis(wrongQuestion.getAnalysis())
                        .lastWrongAnswer(wrongQuestion.getLastWrongAnswer())
                        .wrongCount(wrongQuestion.getWrongCount())
                        .consecutiveCorrect(wrongQuestion.getConsecutiveCorrect())
                        .targetCorrect(3)
                        .lastWrongAt(wrongQuestion.getLastWrongAt())
                        .mastered(wrongQuestion.getMastered())
                        .build())
                .toList());
        result.sort(Comparator.comparing(
                WrongQuestionDto::getLastWrongAt,
                Comparator.nullsLast(Comparator.reverseOrder())
        ));
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "将某题从错题本移除")
    public ResponseEntity<Void> removeWrongQuestion(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails user) {
        var userEntity = userRepository.findByUsername(user.getUsername()).orElseThrow();
        if (id < 0) {
            return webExamWrongQuestionRepository.findByIdAndUserId(-id, userEntity.getId())
                    .map(wrongQuestion -> {
                        webExamWrongQuestionRepository.delete(wrongQuestion);
                        return ResponseEntity.noContent().<Void>build();
                    })
                    .orElse(ResponseEntity.notFound().build());
        }
        return wrongQuestionRepository.findByIdAndUserId(id, userEntity.getId())
                .map(wrongQuestion -> {
                    wrongQuestionRepository.delete(wrongQuestion);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private List<String> readOptions(String optionsJson) {
        if (optionsJson == null || optionsJson.isBlank()) {
            return List.of();
        }
        try {
            return objectMapper.readValue(optionsJson, new TypeReference<>() {});
        } catch (Exception ignored) {
            return List.of();
        }
    }

    private String sourceForExamKey(String examKey) {
        if ("PROJECT_MANAGEMENT".equals(examKey)) {
            return "PROJECT_MANAGEMENT_EXAM";
        }
        if ("SOFTWARE_TESTING".equals(examKey)) {
            return "SOFTWARE_TESTING_EXAM";
        }
        return "WEB_EXAM";
    }
}
