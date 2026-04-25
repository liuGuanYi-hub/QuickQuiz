package com.example.QuickQuiz_backend.controller;

import com.example.QuickQuiz_backend.dto.ExamResultResponse;
import com.example.QuickQuiz_backend.dto.SubmitExamRequest;
import com.example.QuickQuiz_backend.entity.*;
import com.example.QuickQuiz_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@RestController
@RequestMapping("/api/exam")
@RequiredArgsConstructor
public class ExamController {

    private final QuestionRepository questionRepository;
    private final ExerciseRecordRepository exerciseRecordRepository;
    private final WrongQuestionRepository wrongQuestionRepository;
    private final UserRepository userRepository;

    /**
     * 随机获取指定数量的题目用于练习
     */
    @GetMapping("/questions")
    public ResponseEntity<List<Question>> getExamQuestions(
            @RequestParam(defaultValue = "10") int count,
            @AuthenticationPrincipal UserDetails userDetails) {
        List<Question> all = questionRepository.findAll(PageRequest.of(0, 1000)).getContent();
        if (all.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }
        Collections.shuffle(all);
        int size = Math.min(count, all.size());
        return ResponseEntity.ok(all.subList(0, size));
    }

    /**
     * 提交考试答案，判分并返回结果
     */
    @PostMapping("/submit")
    public ResponseEntity<ExamResultResponse> submitExam(
            @RequestBody SubmitExamRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("用户不存在"));

        // 构建 questionId -> Question 映射
        Map<Long, Question> questionMap = new HashMap<>();
        for (Question q : questionRepository.findAll()) {
            questionMap.put(q.getId(), q);
        }

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
            Set<String> correctSet = new HashSet<>(Arrays.asList(correct.split(",")));
            Set<String> userSet = new HashSet<>(Arrays.asList(userAnswer.split(",")));
            return correctSet.equals(userSet);
        }
        return userAnswer.trim().equalsIgnoreCase(correct.trim());
    }
}
