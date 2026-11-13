package com.example.QuickQuiz_backend.controller;

import com.example.QuickQuiz_backend.dto.ExamResultResponse;
import com.example.QuickQuiz_backend.dto.SubmitExamRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.example.QuickQuiz_backend.entity.*;
import com.example.QuickQuiz_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/exam")
@RequiredArgsConstructor
@Tag(name = "练习与考试", description = "随机练习、交卷判分、错题自动入库")
public class ExamController {

    private final QuestionRepository questionRepository;
    private final ExerciseRecordRepository exerciseRecordRepository;
    private final WrongQuestionRepository wrongQuestionRepository;
    private final UserRepository userRepository;

    /**
     * 随机获取指定数量的题目用于练习
     */
    @GetMapping("/questions")
    @Operation(summary = "获取随机练习题", description = "返回指定数量的随机题目用于练习")
    public ResponseEntity<List<Question>> getExamQuestions(
            @RequestParam(defaultValue = "10") int count,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (count <= 0) {
            return ResponseEntity.ok(Collections.emptyList());
        }
        return ResponseEntity.ok(questionRepository.findRandomQuestions(count));
    }

    /**
     * 提交考试答案，判分并返回结果
     */
    @PostMapping("/submit")
    @Operation(summary = "提交考试答案", description = "判分、记录练习历史、自动将错题加入错题本")
    public ResponseEntity<ExamResultResponse> submitExam(
            @RequestBody SubmitExamRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("用户不存在"));

        // 只查本次提交涉及到的题目，避免全表加载
        List<Long> questionIds = request.getAnswers().stream()
                .map(SubmitExamRequest.QuestionAnswer::getQuestionId)
                .distinct()
                .toList();
        Map<Long, Question> questionMap = questionRepository.findAllById(questionIds).stream()
                .collect(java.util.stream.Collectors.toMap(Question::getId, q -> q));

        // 创建练习记录
        ExerciseRecord record = ExerciseRecord.builder()
                .user(user)
                .questionCount(request.getAnswers().size())
                .durationSeconds(request.getDurationSeconds())
                .build();

        List<ExamResultResponse.QuestionResult> results = new ArrayList<>();
        int correctCount = 0;

        for (SubmitExamRequest.QuestionAnswer qa : request.getAnswers()) {
            Question question = questionMap.get(qa.getQuestionId());
            if (question == null) continue;

            boolean isCorrect = isAnswerCorrect(question, qa.getUserAnswer());

            // 记录详情
            ExerciseDetail detail = ExerciseDetail.builder()
                    .record(record)
                    .question(question)
                    .userAnswer(qa.getUserAnswer())
                    .isCorrect(isCorrect)
                    .build();
            record.getDetails().add(detail);

            if (isCorrect) {
                correctCount++;
            }

            // 答错：写入/更新错题本
            boolean addedToWrongBook = false;
            if (!isCorrect) {
                Optional<WrongQuestion> existing = wrongQuestionRepository
                        .findByUserIdAndQuestionId(user.getId(), question.getId());
                if (existing.isPresent()) {
                    WrongQuestion wq = existing.get();
                    wq.setWrongCount(wq.getWrongCount() + 1);
                    wq.setLastWrongAt(java.time.LocalDateTime.now());
                    wq.setConsecutiveCorrect(0);
                    wq.setMastered(false);
                    wrongQuestionRepository.save(wq);
                } else {
                    WrongQuestion newWq = WrongQuestion.builder()
                            .user(user)
                            .question(question)
                            .wrongCount(1)
                            .lastWrongAt(java.time.LocalDateTime.now())
                            .consecutiveCorrect(0)
                            .mastered(false)
                            .build();
                    wrongQuestionRepository.save(newWq);
                }
                addedToWrongBook = true;
            } else {
                // 答对：更新连续正确次数
                wrongQuestionRepository.findByUserIdAndQuestionId(user.getId(), question.getId())
                        .ifPresent(wq -> {
                            int consecutive = wq.getConsecutiveCorrect() + 1;
                            wq.setConsecutiveCorrect(consecutive);
                            if (consecutive >= 3) {
                                wq.setMastered(true);
                            }
                            wrongQuestionRepository.save(wq);
                        });
            }

            // 构建题目结果（只返回必要字段，不暴露答案）
            results.add(ExamResultResponse.QuestionResult.builder()
                    .questionId(question.getId())
                    .content(question.getContent())
                    .questionType(question.getType().name())
                    .options(question.getOptions())
                    .correctAnswer(isCorrect ? null : question.getAnswer())
                    .userAnswer(qa.getUserAnswer())
                    .isCorrect(isCorrect)
                    .addedToWrongBook(addedToWrongBook)
                    .build());
        }

        // 计算得分
        int total = request.getAnswers().size();
        BigDecimal score = total > 0
                ? BigDecimal.valueOf(correctCount * 100.0 / total).setScale(2, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        record.setCorrectCount(correctCount);
        record.setScore(score);
        ExerciseRecord saved = exerciseRecordRepository.save(record);

        return ResponseEntity.ok(ExamResultResponse.builder()
                .recordId(saved.getId())
                .questionCount(total)
                .correctCount(correctCount)
                .score(score)
                .durationSeconds(request.getDurationSeconds())
                .results(results)
                .build());
    }

    private boolean isAnswerCorrect(Question question, String userAnswer) {
        if (userAnswer == null || userAnswer.isBlank()) return false;
        String correct = question.getAnswer();
        if (correct == null) return false;
        // 多选题：答案以逗号分隔，比较集合
        if (question.getType() == QuestionType.MULTIPLE_CHOICE) {
            Set<String> correctSet = splitAnswerSet(correct);
            Set<String> userSet = splitAnswerSet(userAnswer);
            return correctSet.equals(userSet);
        }
        if (question.getType() == QuestionType.TRUE_FALSE) {
            String normalizedUserAnswer = normalizeTrueFalseAnswer(userAnswer);
            String normalizedCorrectAnswer = normalizeTrueFalseAnswer(correct);
            return normalizedUserAnswer.equalsIgnoreCase(normalizedCorrectAnswer);
        }
        return userAnswer.trim().equalsIgnoreCase(correct.trim());
    }

    private String normalizeTrueFalseAnswer(String answer) {
        String normalized = answer.trim();
        if (normalized.equalsIgnoreCase("A")) {
            return "True";
        }
        if (normalized.equalsIgnoreCase("B")) {
            return "False";
        }
        return normalized;
    }

    private Set<String> splitAnswerSet(String answer) {
        return Arrays.stream(answer.split(","))
                .map(String::trim)
                .filter(item -> !item.isEmpty())
                .collect(Collectors.toSet());
    }
}
