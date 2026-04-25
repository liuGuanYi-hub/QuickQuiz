package com.example.QuickQuiz_backend.controller;

import com.example.QuickQuiz_backend.dto.WrongQuestionDto;
import com.example.QuickQuiz_backend.entity.Question;
import com.example.QuickQuiz_backend.entity.WrongQuestion;
import com.example.QuickQuiz_backend.repository.QuestionRepository;
import com.example.QuickQuiz_backend.repository.WrongQuestionRepository;
import com.example.QuickQuiz_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/wrong-questions")
@RequiredArgsConstructor
public class WrongQuestionController {

    private final WrongQuestionRepository wrongQuestionRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<WrongQuestionDto>> getWrongQuestions(
            @AuthenticationPrincipal UserDetails userDetails) {
        var user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("用户不存在"));

        List<WrongQuestion> wqs = wrongQuestionRepository.findByUserIdOrderByLastWrongAtDesc(user.getId());

        List<WrongQuestionDto> dtos = wqs.stream()
                .map(this::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getWrongQuestionCount(
            @AuthenticationPrincipal UserDetails userDetails) {
        var user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        return ResponseEntity.ok(wrongQuestionRepository.countByUserIdAndMasteredFalse(user.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFromWrongBook(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        var user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        wrongQuestionRepository.findById(id).ifPresent(wq -> {
            if (wq.getUser().getId().equals(user.getId())) {
                wrongQuestionRepository.delete(wq);
            }
        });
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/practice")
    public ResponseEntity<Question> practiceQuestion(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        var user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        WrongQuestion wq = wrongQuestionRepository.findById(id)
                .filter(w -> w.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("错题不存在"));
        return ResponseEntity.ok(wq.getQuestion());
    }

    private WrongQuestionDto toDto(WrongQuestion wq) {
        Question q = wq.getQuestion();
        return WrongQuestionDto.builder()
                .id(wq.getId())
                .questionId(q.getId())
                .content(q.getContent())
                .questionType(q.getType().name())
                .options(q.getOptions())
                .correctAnswer(q.getAnswer())
                .wrongCount(wq.getWrongCount())
                .consecutiveCorrect(wq.getConsecutiveCorrect())
                .targetCorrect(3)
                .lastWrongAt(wq.getLastWrongAt())
                .mastered(wq.getMastered())
                .build();
    }
}
