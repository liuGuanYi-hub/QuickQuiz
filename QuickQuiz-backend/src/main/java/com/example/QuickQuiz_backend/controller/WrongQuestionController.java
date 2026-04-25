package com.example.QuickQuiz_backend.controller;

import com.example.QuickQuiz_backend.dto.WrongQuestionDto;
import com.example.QuickQuiz_backend.repository.WrongQuestionRepository;
import com.example.QuickQuiz_backend.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wrong-questions")
@RequiredArgsConstructor
@Tag(name = "错题本", description = "错题查看、练习、移除")
public class WrongQuestionController {

    private final WrongQuestionRepository wrongQuestionRepository;
    private final UserRepository userRepository;

    @GetMapping
    @Operation(summary = "获取当前用户的错题列表（支持标签筛选）")
    public ResponseEntity<List<WrongQuestionDto>> getMyWrongQuestions(
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) Boolean mastered,
            @AuthenticationPrincipal UserDetails user) {
        var userEntity = userRepository.findByUsername(user.getUsername()).orElseThrow();
        var result = wrongQuestionRepository.findByUserWithFilters(userEntity.getId(), tag, mastered);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "将某题从错题本移除")
    public ResponseEntity<Void> removeWrongQuestion(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails user) {
        var userEntity = userRepository.findByUsername(user.getUsername()).orElseThrow();
        wrongQuestionRepository.deleteByIdAndUserId(id, userEntity.getId());
        return ResponseEntity.noContent().build();
    }
}
