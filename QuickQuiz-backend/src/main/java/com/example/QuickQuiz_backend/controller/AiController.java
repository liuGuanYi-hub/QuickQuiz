package com.example.QuickQuiz_backend.controller;

import com.example.QuickQuiz_backend.ai.AiProvider;
import com.example.QuickQuiz_backend.ai.SiliconFlowProvider;
import com.example.QuickQuiz_backend.dto.AiGenerateRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@Tag(name = "AI 出题", description = "SiliconFlow Qwen 模型生成题目")
public class AiController {

    private final SiliconFlowProvider siliconFlowProvider;

    @PostMapping("/generate")
    @Operation(summary = "AI 生成题目", description = "输入知识点描述，AI 生成单选/多选/判断题")
    public ResponseEntity<Map<String, Object>> generateQuestions(@Valid @RequestBody AiGenerateRequest request) {
        AiProvider provider = siliconFlowProvider;
        Map<String, Object> result = provider.generateQuestions(
                request.getTopic(),
                request.getCount() != null ? request.getCount() : 5,
                request.getTypes() != null ? request.getTypes() : List.of("SINGLE_CHOICE", "MULTIPLE_CHOICE", "TRUE_FALSE")
        );
        return ResponseEntity.ok(result);
    }

    @GetMapping("/status")
    @Operation(summary = "AI 服务状态")
    public ResponseEntity<Map<String, Object>> status() {
        boolean enabled = siliconFlowProvider.isEnabled();
        return ResponseEntity.ok(Map.of(
                "enabled", enabled,
                "provider", "SiliconFlow",
                "model", enabled ? siliconFlowProvider.getModel() : "N/A"
        ));
    }
}
