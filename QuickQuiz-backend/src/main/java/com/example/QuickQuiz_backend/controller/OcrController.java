package com.example.QuickQuiz_backend.controller;

import com.example.QuickQuiz_backend.ocr.BaiduOcrProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ocr")
@RequiredArgsConstructor
public class OcrController {

    private final BaiduOcrProvider baiduOcrProvider;

    @PostMapping("/recognize")
    public ResponseEntity<Map<String, Object>> recognize(@RequestParam("image") MultipartFile image) {
        if (image == null || image.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "image_required",
                    "message", "请上传图片"
            ));
        }

        String[] allowedTypes = { "image/jpeg", "image/png", "image/jpg", "image/webp" };
        boolean allowed = false;
        for (String type : allowedTypes) {
            if (image.getContentType() != null && image.getContentType().equalsIgnoreCase(type)) {
                allowed = true;
                break;
            }
        }
        if (!allowed) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "invalid_format",
                    "message", "只支持 JPG/PNG/WEBP 格式图片"
            ));
        }

        // 限制 5MB
        if (image.getSize() > 5 * 1024 * 1024) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "file_too_large",
                    "message", "图片大小不能超过 5MB"
            ));
        }

        try {
            String text = baiduOcrProvider.recognizeText(image);
            Map<String, Object> response = new HashMap<>();
            response.put("text", text);
            response.put("provider", baiduOcrProvider.getProviderName());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "error", "ocr_failed",
                    "message", e.getMessage()
            ));
        }
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("provider", baiduOcrProvider.getProviderName());
        status.put("enabled", baiduOcrProvider.isEnabled());
        return ResponseEntity.ok(status);
    }
}
