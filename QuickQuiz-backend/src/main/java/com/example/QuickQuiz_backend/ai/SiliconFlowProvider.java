package com.example.QuickQuiz_backend.ai;

import com.example.QuickQuiz_backend.dto.AiGenerateRequest;
import com.example.QuickQuiz_backend.dto.QuestionDto;
import com.example.QuickQuiz_backend.entity.QuestionType;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Slf4j
@Component
public class SiliconFlowProvider implements AiProvider {

    @Value("${ai.siliconflow.api-key:}")
    private String apiKey;

    @Value("${ai.siliconflow.model:Qwen/Qwen2.5-7B-Instruct}")
    private String model;

    @Value("${ai.siliconflow.enabled:false}")
    private boolean enabled;

    private final RestTemplate restTemplate = createRestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    private RestTemplate createRestTemplate() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(10_000);
        factory.setReadTimeout(120_000);
        return new RestTemplate(factory);
    }

    @Override
    public boolean isEnabled() {
        return enabled && apiKey != null && !apiKey.isBlank();
    }

    @Override
    public String getProviderName() {
        return "OpenAI-Compatible";
    }

    @Override
    public List<QuestionDto> generateQuestions(AiGenerateRequest request) {
        String effectiveKey = firstNonBlank(request.getApiKey(), apiKey);
        if (effectiveKey == null) {
            throw new RuntimeException("AI API Key 未填写，请在页面输入 API Key");
        }

        String prompt = buildPrompt(request);
        String response = callLlm(prompt, resolveApiUrl(request), effectiveKey, resolveModel(request));
        return parseLlmResponse(response, request.getType());
    }

    private String buildPrompt(AiGenerateRequest request) {
        QuestionType type = request.getType();
        String typeDesc = switch (type) {
            case SINGLE_CHOICE -> "单选题（4个选项，1个正确答案）";
            case MULTIPLE_CHOICE -> "多选题（4个及以上选项，1个或多个正确答案，答案以英文逗号分隔如 A,B）";
            case TRUE_FALSE -> "判断题（True/False）";
        };

        return """
                你是一个专业的在线学习平台出题专家。请根据以下材料生成 %d 道 %s。

                要求：
                - 题目内容简洁准确，选项不重复
                - difficulty 使用 1 到 5 的整数，默认 3
                - 单选题答案使用 A/B/C/D
                - 多选题答案使用英文逗号分隔，例如 A,C
                - 判断题答案只能是 True 或 False
                - 只返回 JSON 数组，不要返回 markdown 或解释

                JSON 格式：
                [
                  {
                    "content": "题目内容",
                    "options": ["选项A", "选项B", "选项C", "选项D"],
                    "answer": "A",
                    "difficulty": 3
                  }
                ]

                材料内容：
                %s
                """.formatted(request.getCount(), typeDesc, request.getMaterial());
    }

    private String callLlm(String prompt, String url, String effectiveKey, String effectiveModel) {
        try {
            Map<String, Object> body = new HashMap<>();
            body.put("model", effectiveModel);
            body.put("messages", List.of(Map.of("role", "user", "content", prompt)));
            body.put("temperature", 0.7);

            var headers = new org.springframework.http.HttpHeaders();
            headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + effectiveKey);

            var entity = new org.springframework.http.HttpEntity<>(body, headers);
            var response = restTemplate.postForEntity(url, entity, String.class);
            HttpStatusCode statusCode = response.getStatusCode();
            if (statusCode.is3xxRedirection()) {
                var redirectLocation = response.getHeaders().getLocation();
                if (redirectLocation == null) {
                    throw new RuntimeException("AI provider returned redirect " + statusCode.value()
                            + " without a Location header. Please check the API URL: " + url);
                }
                response = restTemplate.postForEntity(redirectLocation, entity, String.class);
            }

            String responseBody = response.getBody();
            if (responseBody == null || responseBody.isBlank()) {
                throw new RuntimeException("AI provider returned an empty response");
            }
            if (responseBody.trim().startsWith("<")) {
                throw new RuntimeException("AI provider returned HTML instead of JSON. Please check the API URL: " + url);
            }

            JsonNode root = mapper.readTree(responseBody);
            return root.path("choices").get(0).path("message").path("content").asText();
        } catch (HttpStatusCodeException e) {
            if (e.getStatusCode().value() == 401) {
                throw new RuntimeException("AI provider returned 401 Unauthorized. Please check the API Key, provider account access, and selected model: " + effectiveModel);
            }
            log.error("AI provider call failed with status {}", e.getStatusCode(), e);
            throw new RuntimeException("AI provider returned " + e.getStatusCode().value() + ": " + firstNonBlank(e.getResponseBodyAsString(), e.getStatusText()));
        } catch (Exception e) {
            log.error("AI provider call failed", e);
            throw new RuntimeException("AI 生成失败：" + e.getMessage());
        }
    }

    private String resolveApiUrl(AiGenerateRequest request) {
        String customUrl = firstNonBlank(request.getApiUrl(), null);
        if (customUrl != null) {
            return normalizeApiUrl(customUrl);
        }
        return switch (normalizeProvider(request.getProvider())) {
            case "DEEPSEEK" -> "https://api.deepseek.com/chat/completions";
            case "MINIMAX" -> "https://api.minimaxi.com/v1/chat/completions";
            default -> "https://api.siliconflow.cn/v1/chat/completions";
        };
    }

    private String normalizeApiUrl(String url) {
        String normalized = url.trim();
        if (normalized.equals("https://api.siliconflow.cn") || normalized.equals("https://api.siliconflow.cn/")) {
            return "https://api.siliconflow.cn/v1/chat/completions";
        }
        if (normalized.equals("https://api.deepseek.com") || normalized.equals("https://api.deepseek.com/")) {
            return "https://api.deepseek.com/chat/completions";
        }
        if (normalized.equals("https://api.minimaxi.com") || normalized.equals("https://api.minimaxi.com/")) {
            return "https://api.minimaxi.com/v1/chat/completions";
        }
        return normalized;
    }

    private String resolveModel(AiGenerateRequest request) {
        String customModel = firstNonBlank(request.getModel(), null);
        if (customModel != null) {
            return customModel;
        }
        return switch (normalizeProvider(request.getProvider())) {
            case "DEEPSEEK" -> "deepseek-chat";
            case "MINIMAX" -> "MiniMax-M2.7";
            default -> model;
        };
    }

    private String normalizeProvider(String provider) {
        return provider == null ? "SILICONFLOW" : provider.trim().toUpperCase(Locale.ROOT);
    }

    private String firstNonBlank(String first, String fallback) {
        if (first != null && !first.isBlank()) {
            return first.trim();
        }
        if (fallback != null && !fallback.isBlank()) {
            return fallback.trim();
        }
        return null;
    }

    private List<QuestionDto> parseLlmResponse(String response, QuestionType defaultType) {
        List<QuestionDto> result = new ArrayList<>();
        try {
            String jsonStr = extractJsonPayload(response);

            JsonNode root = mapper.readTree(jsonStr);
            if (root.has("questions") && root.get("questions").isArray()) {
                root = root.get("questions");
            }
            if (!root.isArray()) {
                throw new RuntimeException("LLM 返回格式错误，期望 JSON 数组");
            }

            for (JsonNode node : root) {
                QuestionDto dto = new QuestionDto();
                dto.setContent(node.path("content").asText());
                dto.setType(defaultType);
                dto.setDifficulty(node.path("difficulty").asInt(3));

                List<String> options = new ArrayList<>();
                JsonNode opts = node.path("options");
                if (opts.isArray()) {
                    for (JsonNode o : opts) {
                        options.add(o.asText());
                    }
                }
                if (defaultType == QuestionType.TRUE_FALSE && options.isEmpty()) {
                    options = List.of("True", "False");
                }
                dto.setOptions(options);

                String answer = node.path("answer").asText();
                if (defaultType == QuestionType.MULTIPLE_CHOICE && answer.matches("\\d[,\\d]*")) {
                    String[] indices = answer.split(",");
                    answer = Arrays.stream(indices)
                            .map(s -> String.valueOf((char) ('A' + Integer.parseInt(s.trim()))))
                            .reduce("", (a, b) -> a.isEmpty() ? b : a + "," + b);
                } else if (defaultType == QuestionType.SINGLE_CHOICE && answer.matches("\\d")) {
                    answer = String.valueOf((char) ('A' + Integer.parseInt(answer)));
                } else if (defaultType == QuestionType.TRUE_FALSE) {
                    answer = answer.equalsIgnoreCase("true") || answer.equals("1") ? "True" : "False";
                }
                dto.setAnswer(answer);
                result.add(dto);
            }
        } catch (Exception e) {
            log.error("LLM response parse failed: {}", response, e);
            throw new RuntimeException("AI 返回格式解析失败，请重试。原始响应：" + response.substring(0, Math.min(200, response.length())));
        }
        return result;
    }

    private String extractJsonPayload(String response) {
        String cleaned = response.trim()
                .replaceAll("(?is)<think>.*?</think>", "")
                .replaceAll("(?is)```(?:json)?", "")
                .replace("```", "")
                .trim();
        if (cleaned.startsWith("[") || cleaned.startsWith("{")) {
            return cleaned;
        }

        int arrayStart = cleaned.indexOf('[');
        int arrayEnd = cleaned.lastIndexOf(']');
        if (arrayStart >= 0 && arrayEnd > arrayStart) {
            return cleaned.substring(arrayStart, arrayEnd + 1);
        }

        int objectStart = cleaned.indexOf('{');
        int objectEnd = cleaned.lastIndexOf('}');
        if (objectStart >= 0 && objectEnd > objectStart) {
            return cleaned.substring(objectStart, objectEnd + 1);
        }

        return cleaned;
    }
}
