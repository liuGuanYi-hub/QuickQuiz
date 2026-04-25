package com.example.QuickQuiz_backend.controller;

import com.example.QuickQuiz_backend.ai.AiProvider;
import com.example.QuickQuiz_backend.ai.SiliconFlowProvider;
import com.example.QuickQuiz_backend.dto.AiGenerateRequest;
import com.example.QuickQuiz_backend.dto.QuestionDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final SiliconFlowProvider siliconFlowProvider;

    @PostMapping("/generate")
    public ResponseEntity<Map<String, Object>> generateQuestions(@Valid @RequestBody AiGenerateRequest request) {
        AiProvider provider = siliconFlowProvider;

        if (!provider.isEnabled()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "ai_not_enabled",
                    "message", "AI 功能未启用，请联系管理员配置。"
            ));
        }

        try {
            List<QuestionDto> questions = provider.generateQuestions(request);
            Map<String, Object> response = new HashMap<>();
            response.put("questions", questions);
            response.put("provider", provider.getProviderName());
            response.put("count", questions.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "error", "generation_failed",
                    "message", e.getMessage()
            ));
        }
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("provider", siliconFlowProvider.getProviderName());
        status.put("enabled", siliconFlowProvider.isEnabled());
        return ResponseEntity.ok(status);
    }
}
