package com.example.QuickQuiz_backend.controller;

import com.example.QuickQuiz_backend.dto.SoftwareTestingExamSubmitRequest;
import com.example.QuickQuiz_backend.dto.SoftwareTestingExamSubmitResponse;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/software-testing-exam")
@RequiredArgsConstructor
public class SoftwareTestingExamController {

    private static final String EXAM_KEY = "SOFTWARE_TESTING";
    private static final Map<String, SetSpec> SETS = Map.of(
            "practice-1", new SetSpec("practice-1", 1, "软件测试练习 1", 1, 6, 6, 0, Map.of(
                    "SINGLE_CHOICE", 2, "MULTIPLE_CHOICE", 1, "TRUE_FALSE", 3, "FILL_BLANK", 0, "SUBJECTIVE", 0)),
            "practice-2", new SetSpec("practice-2", 2, "软件测试练习 2", 7, 16, 10, 0, Map.of(
                    "SINGLE_CHOICE", 3, "MULTIPLE_CHOICE", 3, "TRUE_FALSE", 2, "FILL_BLANK", 2, "SUBJECTIVE", 0)),
            "practice-3", new SetSpec("practice-3", 3, "软件测试练习 3", 17, 24, 8, 0, Map.of(
                    "SINGLE_CHOICE", 1, "MULTIPLE_CHOICE", 3, "TRUE_FALSE", 2, "FILL_BLANK", 2, "SUBJECTIVE", 0)),
            "practice-4", new SetSpec("practice-4", 4, "软件测试练习 4", 25, 29, 5, 0, Map.of(
                    "SINGLE_CHOICE", 1, "MULTIPLE_CHOICE", 0, "TRUE_FALSE", 0, "FILL_BLANK", 4, "SUBJECTIVE", 0)),
            "practice-5", new SetSpec("practice-5", 5, "软件测试练习 5", 30, 35, 6, 1, Map.of(
                    "SINGLE_CHOICE", 2, "MULTIPLE_CHOICE", 0, "TRUE_FALSE", 0, "FILL_BLANK", 3, "SUBJECTIVE", 1)),
            "static-testing", new SetSpec("static-testing", 6, "静态测试", 36, 37, 2, 0, Map.of(
                    "SINGLE_CHOICE", 0, "MULTIPLE_CHOICE", 2, "TRUE_FALSE", 0, "FILL_BLANK", 0, "SUBJECTIVE", 0)),
            "system-testing-1", new SetSpec("system-testing-1", 7, "系统测试1", 38, 42, 5, 0, Map.of(
                    "SINGLE_CHOICE", 2, "MULTIPLE_CHOICE", 3, "TRUE_FALSE", 0, "FILL_BLANK", 0, "SUBJECTIVE", 0)),
            "performance-testing", new SetSpec("performance-testing", 8, "性能测试练习题", 43, 49, 7, 0, Map.of(
                    "SINGLE_CHOICE", 2, "MULTIPLE_CHOICE", 0, "TRUE_FALSE", 2, "FILL_BLANK", 3, "SUBJECTIVE", 0)),
            "localization-testing", new SetSpec("localization-testing", 9, "本地化测试习题", 50, 52, 3, 2, Map.of(
                    "SINGLE_CHOICE", 0, "MULTIPLE_CHOICE", 0, "TRUE_FALSE", 1, "FILL_BLANK", 0, "SUBJECTIVE", 2))
    );

    private final UserRepository userRepository;
    private final ExerciseRecordRepository exerciseRecordRepository;
    private final WebExamWrongQuestionRepository webExamWrongQuestionRepository;
    private final ObjectMapper objectMapper;

    @PostMapping("/sets/{setId}/submit")
    @Transactional
    public ResponseEntity<SoftwareTestingExamSubmitResponse> submit(
            @PathVariable String setId,
            @Valid @RequestBody SoftwareTestingExamSubmitRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        SetSpec setSpec = requireSet(setId);
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("用户不存在"));

        validateSubmission(setSpec, request);

        int correctCount = (int) request.getAnswers().stream()
                .filter(answer -> Boolean.TRUE.equals(answer.getCorrect()))
                .count();
        BigDecimal score = BigDecimal.valueOf(correctCount)
                .multiply(BigDecimal.valueOf(100))
                .divide(BigDecimal.valueOf(setSpec.totalCount()), 2, RoundingMode.HALF_UP);

        ExerciseRecord savedRecord = exerciseRecordRepository.save(ExerciseRecord.builder()
                .user(user)
                .questionCount(setSpec.totalCount())
                .correctCount(correctCount)
                .score(score)
                .durationSeconds(request.getDurationSeconds())
                .build());

        int wrongSaved = 0;
        for (SoftwareTestingExamSubmitRequest.AnswerSnapshot answer : request.getAnswers()) {
            if (Boolean.TRUE.equals(answer.getCorrect())) {
                markCorrectIfExists(user, answer.getQuestionId());
            } else {
                upsertWrongQuestion(user, answer);
                wrongSaved++;
            }
        }

        return ResponseEntity.ok(SoftwareTestingExamSubmitResponse.builder()
                .recordId(savedRecord.getId())
                .setId(setSpec.setId())
                .setOrder(setSpec.order())
                .setTitle(setSpec.title())
                .questionCount(setSpec.totalCount())
                .correctCount(correctCount)
                .score(score)
                .durationSeconds(request.getDurationSeconds())
                .wrongQuestionsSaved(wrongSaved)
                .build());
    }

    private SetSpec requireSet(String setId) {
        SetSpec setSpec = SETS.get(setId);
        if (setSpec == null) {
            throw new IllegalArgumentException("软件测试套卷不存在");
        }
        return setSpec;
    }

    private void validateSubmission(
            SetSpec setSpec,
            SoftwareTestingExamSubmitRequest request
    ) {
        if (request.getAnswers().size() != setSpec.totalCount()) {
            throw new IllegalArgumentException(
                    "第%d套固定卷必须提交%d道题".formatted(setSpec.order(), setSpec.totalCount())
            );
        }

        Set<String> ids = new HashSet<>();
        Set<Integer> numbers = new HashSet<>();
        Map<String, Integer> typeCounts = new HashMap<>(Map.of(
                "SINGLE_CHOICE", 0,
                "MULTIPLE_CHOICE", 0,
                "TRUE_FALSE", 0,
                "FILL_BLANK", 0,
                "SUBJECTIVE", 0
        ));
        int subjectiveAssessedCount = 0;

        for (SoftwareTestingExamSubmitRequest.AnswerSnapshot answer : request.getAnswers()) {
            if (!ids.add(answer.getQuestionId()) || !numbers.add(answer.getQuestionNumber())) {
                throw new IllegalArgumentException("提交中存在重复题目");
            }
            if (answer.getQuestionNumber() < setSpec.startQuestionNumber()
                    || answer.getQuestionNumber() > setSpec.endQuestionNumber()) {
                throw new IllegalArgumentException("提交中包含其他套卷题目");
            }

            String expectedId = "st-%03d".formatted(answer.getQuestionNumber());
            if (!expectedId.equals(answer.getQuestionId())) {
                throw new IllegalArgumentException("题号与题目ID不匹配");
            }
            if (!setSpec.setId().equals(answer.getSetId())
                    || !setSpec.order().equals(answer.getSetOrder())
                    || !setSpec.title().equals(answer.getSetTitle())) {
                throw new IllegalArgumentException("套卷信息与提交路径不匹配");
            }

            typeCounts.merge(answer.getQuestionType(), 1, Integer::sum);
            boolean subjective = "SUBJECTIVE".equals(answer.getQuestionType());
            if (subjective) {
                if (!Boolean.TRUE.equals(answer.getSelfAssessed())) {
                    throw new IllegalArgumentException("本套简答题必须完成自评后才能保存");
                }
                subjectiveAssessedCount++;
            } else if (Boolean.TRUE.equals(answer.getSelfAssessed())) {
                throw new IllegalArgumentException("仅简答题可以标记为已自评");
            }
        }

        if (numbers.size() != setSpec.totalCount()) {
            throw new IllegalArgumentException("本套题号范围不完整");
        }
        if (subjectiveAssessedCount != setSpec.subjectiveCount()) {
            throw new IllegalArgumentException("本套简答题自评数量不正确");
        }
        if (!setSpec.typeCounts().equals(typeCounts)) {
            throw new IllegalArgumentException("本套题型数量不正确");
        }
    }

    private void upsertWrongQuestion(
            User user,
            SoftwareTestingExamSubmitRequest.AnswerSnapshot answer
    ) {
        WebExamWrongQuestion wrongQuestion = webExamWrongQuestionRepository
                .findByUserIdAndExamKeyAndStaticQuestionId(user.getId(), EXAM_KEY, answer.getQuestionId())
                .orElseGet(() -> WebExamWrongQuestion.builder()
                        .user(user)
                        .examKey(EXAM_KEY)
                        .staticQuestionId(answer.getQuestionId())
                        .wrongCount(0)
                        .build());

        wrongQuestion.setExamKey(EXAM_KEY);
        wrongQuestion.setChapter(answer.getSetOrder());
        wrongQuestion.setChapterTitle(answer.getSetTitle());
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
                    int consecutive = (wrongQuestion.getConsecutiveCorrect() == null
                            ? 0
                            : wrongQuestion.getConsecutiveCorrect()) + 1;
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

    private record SetSpec(
            String setId,
            Integer order,
            String title,
            Integer startQuestionNumber,
            Integer endQuestionNumber,
            Integer totalCount,
            Integer subjectiveCount,
            Map<String, Integer> typeCounts
    ) {
    }
}
