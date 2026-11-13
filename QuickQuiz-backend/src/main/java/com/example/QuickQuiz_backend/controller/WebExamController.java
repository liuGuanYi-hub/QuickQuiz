package com.example.QuickQuiz_backend.controller;

import com.example.QuickQuiz_backend.dto.WebExamSubmitRequest;
import com.example.QuickQuiz_backend.dto.WebExamSubmitResponse;
import com.example.QuickQuiz_backend.entity.ExerciseRecord;
import com.example.QuickQuiz_backend.entity.User;
import com.example.QuickQuiz_backend.entity.WebExamWrongQuestion;
import com.example.QuickQuiz_backend.repository.ExerciseRecordRepository;
import com.example.QuickQuiz_backend.repository.UserRepository;
import com.example.QuickQuiz_backend.repository.WebExamWrongQuestionRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/web-exam")
@RequiredArgsConstructor
public class WebExamController {

    private static final String EXAM_KEY = "WEB_FRONTEND";
    private static final int EXPECTED_QUESTION_COUNT = 41;
    private static final int MAX_OBJECTIVE_SCORE = 80;
    private static final int MAX_TOTAL_SCORE = 100;

    private final UserRepository userRepository;
    private final ExerciseRecordRepository exerciseRecordRepository;
    private final WebExamWrongQuestionRepository webExamWrongQuestionRepository;
    private final ObjectMapper objectMapper;

    @PostMapping("/submit")
    @Transactional
    public ResponseEntity<WebExamSubmitResponse> submitWebExam(
            @Valid @RequestBody WebExamSubmitRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("用户不存在"));

        validateSubmission(request);

        int objectiveScore = request.getAnswers().stream()
                .filter(answer -> !"OPERATION".equals(answer.getQuestionType()))
                .mapToInt(WebExamSubmitRequest.AnswerSnapshot::getEarnedScore)
                .sum();
        int totalScore = objectiveScore + request.getOperationScore();
        int correctCount = (int) request.getAnswers().stream()
                .filter(answer -> !"OPERATION".equals(answer.getQuestionType()))
                .filter(answer -> Boolean.TRUE.equals(answer.getCorrect()))
                .count();

        ExerciseRecord savedRecord = exerciseRecordRepository.save(ExerciseRecord.builder()
                .user(user)
                .questionCount(EXPECTED_QUESTION_COUNT)
                .correctCount(correctCount)
                .score(BigDecimal.valueOf(totalScore))
                .durationSeconds(request.getDurationSeconds())
                .build());

        int wrongSaved = 0;
        for (WebExamSubmitRequest.AnswerSnapshot answer : request.getAnswers()) {
            if ("OPERATION".equals(answer.getQuestionType())) {
                continue;
            }

            if (Boolean.TRUE.equals(answer.getCorrect())) {
                markCorrectIfExists(user, answer.getQuestionId());
            } else {
                upsertWrongQuestion(user, answer);
                wrongSaved++;
            }
        }

        return ResponseEntity.ok(WebExamSubmitResponse.builder()
                .recordId(savedRecord.getId())
                .questionCount(EXPECTED_QUESTION_COUNT)
                .correctCount(correctCount)
                .score(BigDecimal.valueOf(totalScore))
                .durationSeconds(request.getDurationSeconds())
                .wrongQuestionsSaved(wrongSaved)
                .build());
    }

    private void validateSubmission(WebExamSubmitRequest request) {
        if (request.getAnswers().size() != EXPECTED_QUESTION_COUNT) {
            throw new IllegalArgumentException("Web前端固定卷必须提交41道题");
        }

        Set<String> ids = new HashSet<>();
        int objectiveScore = 0;
        for (WebExamSubmitRequest.AnswerSnapshot answer : request.getAnswers()) {
            if (!ids.add(answer.getQuestionId())) {
                throw new IllegalArgumentException("提交中存在重复题目");
            }

            if ("OPERATION".equals(answer.getQuestionType())) {
                if (answer.getEarnedScore() != 0) {
                    throw new IllegalArgumentException("操作题得分请使用operationScore字段提交");
                }
                continue;
            }

            objectiveScore += answer.getEarnedScore();
            if (Boolean.TRUE.equals(answer.getCorrect()) && answer.getEarnedScore() != 2) {
                throw new IllegalArgumentException("客观题正确时得分必须为2");
            }
            if (!Boolean.TRUE.equals(answer.getCorrect()) && answer.getEarnedScore() != 0) {
                throw new IllegalArgumentException("客观题错误时得分必须为0");
            }
        }

        if (objectiveScore > MAX_OBJECTIVE_SCORE || objectiveScore + request.getOperationScore() > MAX_TOTAL_SCORE) {
            throw new IllegalArgumentException("试卷得分超出范围");
        }
    }

    private void upsertWrongQuestion(User user, WebExamSubmitRequest.AnswerSnapshot answer) {
        WebExamWrongQuestion wrongQuestion = webExamWrongQuestionRepository
                .findByUserIdAndExamKeyAndStaticQuestionId(user.getId(), EXAM_KEY, answer.getQuestionId())
                .orElseGet(() -> WebExamWrongQuestion.builder()
                        .user(user)
                        .examKey(EXAM_KEY)
                        .staticQuestionId(answer.getQuestionId())
                        .wrongCount(0)
                        .build());

        wrongQuestion.setExamKey(EXAM_KEY);
        wrongQuestion.setChapter(answer.getChapter());
        wrongQuestion.setChapterTitle(answer.getChapterTitle());
        wrongQuestion.setQuestionType(answer.getQuestionType());
        wrongQuestion.setContent(answer.getContent());
        wrongQuestion.setOptionsJson(toJson(answer.getOptions()));
        wrongQuestion.setCorrectAnswer(answer.getCorrectAnswer());
        wrongQuestion.setAnalysis(answer.getAnalysis());
        wrongQuestion.setLastWrongAnswer(answer.getUserAnswer());
        wrongQuestion.setWrongCount((wrongQuestion.getWrongCount() == null ? 0 : wrongQuestion.getWrongCount()) + 1);
        wrongQuestion.setLastWrongAt(LocalDateTime.now());
        wrongQuestion.setConsecutiveCorrect(0);
        wrongQuestion.setMastered(false);

        webExamWrongQuestionRepository.save(wrongQuestion);
    }

    private void markCorrectIfExists(User user, String staticQuestionId) {
        webExamWrongQuestionRepository.findByUserIdAndExamKeyAndStaticQuestionId(
                        user.getId(),
                        EXAM_KEY,
                        staticQuestionId
                )
                .ifPresent(wrongQuestion -> {
                    int consecutive = (wrongQuestion.getConsecutiveCorrect() == null ? 0 : wrongQuestion.getConsecutiveCorrect()) + 1;
                    wrongQuestion.setConsecutiveCorrect(consecutive);
                    if (consecutive >= 3) {
                        wrongQuestion.setMastered(true);
                    }
                    webExamWrongQuestionRepository.save(wrongQuestion);
                });
    }

    private String toJson(Object value) {
        try {
            return objectMapper.writeValueAsString(value);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("题目选项序列化失败", e);
        }
    }
}
