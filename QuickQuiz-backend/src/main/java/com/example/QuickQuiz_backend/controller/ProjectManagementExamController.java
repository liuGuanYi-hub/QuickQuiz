package com.example.QuickQuiz_backend.controller;

import com.example.QuickQuiz_backend.dto.ProjectManagementExamSubmitRequest;
import com.example.QuickQuiz_backend.dto.ProjectManagementExamSubmitResponse;
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
@RequestMapping("/api/project-management-exam")
@RequiredArgsConstructor
public class ProjectManagementExamController {

    private static final String EXAM_KEY = "PROJECT_MANAGEMENT";
    private static final Set<Integer> UNSCORED_QUESTION_NUMBERS = Set.of(62, 63, 64, 114, 116, 117);
    private static final Map<Integer, ChapterSpec> CHAPTERS = Map.of(
            1, new ChapterSpec(1, "项目基础与立项", 1, 31, 31, 31, 5, Map.of(
                    "SINGLE_CHOICE", 26, "TRUE_FALSE", 0, "SUBJECTIVE", 5)),
            2, new ChapterSpec(2, "需求与范围管理", 32, 54, 23, 23, 3, Map.of(
                    "SINGLE_CHOICE", 15, "TRUE_FALSE", 5, "SUBJECTIVE", 3)),
            3, new ChapterSpec(3, "成本管理", 55, 100, 46, 43, 6, Map.of(
                    "SINGLE_CHOICE", 20, "TRUE_FALSE", 17, "SUBJECTIVE", 9)),
            4, new ChapterSpec(4, "进度与计划管理", 101, 155, 55, 52, 8, Map.of(
                    "SINGLE_CHOICE", 26, "TRUE_FALSE", 18, "SUBJECTIVE", 11)),
            5, new ChapterSpec(5, "风险管理", 156, 216, 61, 61, 6, Map.of(
                    "SINGLE_CHOICE", 36, "TRUE_FALSE", 19, "SUBJECTIVE", 6)),
            6, new ChapterSpec(6, "配置与变更管理", 217, 279, 63, 63, 21, Map.of(
                    "SINGLE_CHOICE", 22, "TRUE_FALSE", 20, "SUBJECTIVE", 21)),
            7, new ChapterSpec(7, "人力与资源管理", 280, 329, 50, 50, 0, Map.of(
                    "SINGLE_CHOICE", 30, "TRUE_FALSE", 20, "SUBJECTIVE", 0)),
            8, new ChapterSpec(8, "质量管理与 CMMI", 330, 391, 62, 62, 6, Map.of(
                    "SINGLE_CHOICE", 36, "TRUE_FALSE", 20, "SUBJECTIVE", 6))
    );

    private final UserRepository userRepository;
    private final ExerciseRecordRepository exerciseRecordRepository;
    private final WebExamWrongQuestionRepository webExamWrongQuestionRepository;
    private final ObjectMapper objectMapper;

    @PostMapping("/chapters/{chapter}/submit")
    @Transactional
    public ResponseEntity<ProjectManagementExamSubmitResponse> submit(
            @PathVariable Integer chapter,
            @Valid @RequestBody ProjectManagementExamSubmitRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        ChapterSpec chapterSpec = requireChapter(chapter);
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("用户不存在"));

        validateSubmission(chapterSpec, request);

        int correctCount = (int) request.getAnswers().stream()
                .filter(answer -> Boolean.TRUE.equals(answer.getScored()))
                .filter(answer -> Boolean.TRUE.equals(answer.getCorrect()))
                .count();
        BigDecimal score = BigDecimal.valueOf(correctCount)
                .multiply(BigDecimal.valueOf(100))
                .divide(BigDecimal.valueOf(chapterSpec.scoredCount()), 2, RoundingMode.HALF_UP);

        ExerciseRecord savedRecord = exerciseRecordRepository.save(ExerciseRecord.builder()
                .user(user)
                .questionCount(chapterSpec.scoredCount())
                .correctCount(correctCount)
                .score(score)
                .durationSeconds(request.getDurationSeconds())
                .build());

        int wrongSaved = 0;
        for (ProjectManagementExamSubmitRequest.AnswerSnapshot answer : request.getAnswers()) {
            if (!Boolean.TRUE.equals(answer.getScored())) {
                continue;
            }
            if (Boolean.TRUE.equals(answer.getCorrect())) {
                markCorrectIfExists(user, answer.getQuestionId());
            } else {
                upsertWrongQuestion(user, answer);
                wrongSaved++;
            }
        }

        return ResponseEntity.ok(ProjectManagementExamSubmitResponse.builder()
                .recordId(savedRecord.getId())
                .chapter(chapterSpec.chapter())
                .chapterTitle(chapterSpec.title())
                .totalQuestionCount(chapterSpec.totalCount())
                .questionCount(chapterSpec.scoredCount())
                .correctCount(correctCount)
                .score(score)
                .durationSeconds(request.getDurationSeconds())
                .wrongQuestionsSaved(wrongSaved)
                .build());
    }

    private ChapterSpec requireChapter(Integer chapter) {
        ChapterSpec chapterSpec = CHAPTERS.get(chapter);
        if (chapterSpec == null) {
            throw new IllegalArgumentException("项目管理章节必须为1至8");
        }
        return chapterSpec;
    }

    private void validateSubmission(
            ChapterSpec chapterSpec,
            ProjectManagementExamSubmitRequest request
    ) {
        if (request.getAnswers().size() != chapterSpec.totalCount()) {
            throw new IllegalArgumentException(
                    "第%d套固定卷必须提交%d道题".formatted(chapterSpec.chapter(), chapterSpec.totalCount())
            );
        }

        Set<String> ids = new HashSet<>();
        Set<Integer> numbers = new HashSet<>();
        Map<String, Integer> typeCounts = new HashMap<>(Map.of(
                "SINGLE_CHOICE", 0,
                "TRUE_FALSE", 0,
                "SUBJECTIVE", 0
        ));
        int scoredCount = 0;
        int subjectiveAssessedCount = 0;

        for (ProjectManagementExamSubmitRequest.AnswerSnapshot answer : request.getAnswers()) {
            if (!ids.add(answer.getQuestionId()) || !numbers.add(answer.getQuestionNumber())) {
                throw new IllegalArgumentException("提交中存在重复题目");
            }
            if (answer.getQuestionNumber() < chapterSpec.startQuestionNumber()
                    || answer.getQuestionNumber() > chapterSpec.endQuestionNumber()) {
                throw new IllegalArgumentException("提交中包含其他章节题目");
            }

            String expectedId = "pm-%03d".formatted(answer.getQuestionNumber());
            if (!expectedId.equals(answer.getQuestionId())) {
                throw new IllegalArgumentException("题号与题目ID不匹配");
            }
            if (!chapterSpec.chapter().equals(answer.getModuleIndex())
                    || !chapterSpec.title().equals(answer.getModuleTitle())) {
                throw new IllegalArgumentException("章节信息与提交路径不匹配");
            }

            boolean expectedScored = !UNSCORED_QUESTION_NUMBERS.contains(answer.getQuestionNumber());
            if (Boolean.TRUE.equals(answer.getScored()) != expectedScored) {
                throw new IllegalArgumentException("计分题标记不正确");
            }
            if (!expectedScored && Boolean.TRUE.equals(answer.getCorrect())) {
                throw new IllegalArgumentException("不计分题不能标记为答对");
            }

            typeCounts.merge(answer.getQuestionType(), 1, Integer::sum);
            if (expectedScored) {
                scoredCount++;
            }

            boolean subjective = "SUBJECTIVE".equals(answer.getQuestionType());
            if (subjective && expectedScored) {
                if (!Boolean.TRUE.equals(answer.getSelfAssessed())) {
                    throw new IllegalArgumentException("本章所有计分主观题必须完成自评");
                }
                subjectiveAssessedCount++;
            } else if (Boolean.TRUE.equals(answer.getSelfAssessed())) {
                throw new IllegalArgumentException("仅计分主观题可以标记为已自评");
            }
        }

        if (numbers.size() != chapterSpec.totalCount()) {
            throw new IllegalArgumentException("本章题号范围不完整");
        }
        if (scoredCount != chapterSpec.scoredCount()) {
            throw new IllegalArgumentException("本章计分题数量不正确");
        }
        if (subjectiveAssessedCount != chapterSpec.subjectiveScoredCount()) {
            throw new IllegalArgumentException("本章主观题自评数量不正确");
        }
        if (!chapterSpec.typeCounts().equals(typeCounts)) {
            throw new IllegalArgumentException("本章题型数量不正确");
        }
    }

    private void upsertWrongQuestion(
            User user,
            ProjectManagementExamSubmitRequest.AnswerSnapshot answer
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
        wrongQuestion.setChapter(answer.getModuleIndex());
        wrongQuestion.setChapterTitle(answer.getModuleTitle());
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

    private record ChapterSpec(
            Integer chapter,
            String title,
            Integer startQuestionNumber,
            Integer endQuestionNumber,
            Integer totalCount,
            Integer scoredCount,
            Integer subjectiveScoredCount,
            Map<String, Integer> typeCounts
    ) {
    }
}
