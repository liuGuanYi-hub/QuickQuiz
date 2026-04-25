package com.example.QuickQuiz_backend.controller;

import com.example.QuickQuiz_backend.ocr.BaiduOcrProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/ocr")
@RequiredArgsConstructor
@Tag(name = "OCR 识题", description = "百度 OCR 拍照识别题目")
public class OcrController {

    private final BaiduOcrProvider baiduOcrProvider;

    @PostMapping("/recognize")
    @Operation(summary = "上传图片识别文字")
    public ResponseEntity<Map<String, Object>> recognize(@RequestParam("image") MultipartFile image) {
        if (image == null || image.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "image_required",
                    "message", "请上传图片"
            ));
        }
        try {
            String text = baiduOcrProvider.recognize(image.getInputStream());
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "text", text
            ));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of(
                    "success", false,
                    "error", "ocr_failed",
                    "message", "OCR 识别失败: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/status")
    @Operation(summary = "OCR 服务状态")
    public ResponseEntity<Map<String, Object>> status() {
        boolean enabled = baiduOcrProvider.isEnabled();
        return ResponseEntity.ok(Map.of(
                "enabled", enabled,
                "provider", "Baidu OCR"
        ));
    }
}
