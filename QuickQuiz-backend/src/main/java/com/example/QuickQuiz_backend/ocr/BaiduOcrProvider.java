package com.example.QuickQuiz_backend.ocr;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.*;

/**
 * 百度文字识别 OCR 实现
 * 文档: https://cloud.baidu.com/doc/OCRAPI/s/ZCXLZNYZ9
 * 
 * 免费额度：5000次/天
 * 通用文字识别（标准版）免费
 */
@Slf4j
@Component
public class BaiduOcrProvider implements OcrProvider {

    @Value("${ocr.baidu.enabled:false}")
    private boolean enabled;

    @Value("${ocr.baidu.api-key:}")
    private String apiKey;

    @Value("${ocr.baidu.secret-key:}")
    private String secretKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    // 本地缓存 access_token
    private String cachedToken;
    private long tokenExpireAt;

    @Override
    public boolean isEnabled() {
        return enabled && apiKey != null && !apiKey.isBlank() && secretKey != null && !secretKey.isBlank();
    }

    @Override
    public String getProviderName() {
        return "Baidu OCR";
    }

    @Override
    public String recognizeText(MultipartFile image) throws IOException {
        if (!isEnabled()) {
            throw new RuntimeException("百度 OCR 未启用，请检查配置（ocr.baidu.enabled / ocr.baidu.api-key / ocr.baidu.secret-key）");
        }

        String token = getAccessToken();
        String url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=" + token;

        // 图片转 base64
        String imageBase64 = Base64.getEncoder().encodeToString(image.getBytes());

        Map<String, Object> body = new HashMap<>();
        body.put("image", imageBase64);

        var headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);

        var entity = new org.springframework.http.HttpEntity<>(body, headers);
        var response = restTemplate.postForEntity(url, entity, String.class);

        return parseOcrResponse(response.getBody());
    }

    private String getAccessToken() {
        if (cachedToken != null && System.currentTimeMillis() < tokenExpireAt) {
            return cachedToken;
        }

        try {
            String url = "https://aip.baidubce.com/oauth/2.0/token";
            Map<String, String> params = Map.of(
                    "grant_type", "client_credentials",
                    "client_id", apiKey,
                    "client_secret", secretKey
            );

            // 注意：百度要求 form-urlencoded
            var headers = new org.springframework.http.HttpHeaders();
            headers.setContentType(org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED);

            String bodyStr = params.entrySet().stream()
                    .map(e -> e.getKey() + "=" + e.getValue())
                    .reduce("", (a, b) -> a + (a.isEmpty() ? "" : "&") + b);

            var entity = new org.springframework.http.HttpEntity<>(bodyStr, headers);
            var response = restTemplate.postForEntity(url, entity, String.class);

            JsonNode node = mapper.readTree(response.getBody());
            cachedToken = node.get("access_token").asText();
            // 提前5分钟过期
            tokenExpireAt = System.currentTimeMillis() + (node.get("expires_in").asLong() - 300) * 1000;

            return cachedToken;
        } catch (Exception e) {
            log.error("获取百度 OCR Access Token 失败", e);
            throw new RuntimeException("OCR 认证失败：" + e.getMessage());
        }
    }

    private String parseOcrResponse(String jsonBody) {
        try {
            JsonNode root = mapper.readTree(jsonBody);
            JsonNode wordsResult = root.get("words_result");
            if (wordsResult == null || !wordsResult.isArray()) {
                String errorMsg = root.has("error_msg") ? root.get("error_msg").asText() : "识别失败";
                throw new RuntimeException("OCR 识别失败：" + errorMsg);
            }

            StringBuilder sb = new StringBuilder();
            for (JsonNode wordNode : wordsResult) {
                sb.append(wordNode.get("words").asText()).append("\n");
            }
            return sb.toString().trim();
        } catch (Exception e) {
            if (e instanceof RuntimeException) throw (RuntimeException) e;
            throw new RuntimeException("OCR 响应解析失败：" + e.getMessage());
        }
    }
}
