package com.example.QuickQuiz_backend.ai;

import com.example.QuickQuiz_backend.dto.AiGenerateRequest;
import com.example.QuickQuiz_backend.dto.QuestionDto;
import com.example.QuickQuiz_backend.entity.QuestionType;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.*;

/**
 * 硅基流动（SiliconFlow）LLM 实现
 * API文档: https://docs.siliconflow.cn
 */
@Slf4j
@Component
public class SiliconFlowProvider implements AiProvider {

    @Value("${ai.siliconflow.api-key:}")
    private String apiKey;

    @Value("${ai.siliconflow.model:Qwen/Qwen2.5-7B-Instruct}")
    private String model;

    @Value("${ai.siliconflow.enabled:false}")
    private boolean enabled;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public boolean isEnabled() {
        return enabled && apiKey != null && !apiKey.isBlank();
    }

    @Override
    public String getProviderName() {
        return "SiliconFlow";
    }

    @Override
    public List<QuestionDto> generateQuestions(AiGenerateRequest request) {
        if (!isEnabled()) {
            throw new RuntimeException("SiliconFlow AI 未启用，请检查配置（ai.siliconflow.enabled 和 ai.siliconflow.api-key）");
        }

        String prompt = buildPrompt(request);
        String response = callLlm(prompt);

        return parseLlmResponse(response, request.getType());
    }

    private String buildPrompt(AiGenerateRequest request) {
        QuestionType type = request.getType();
        String typeDesc = switch (type) {
            case SINGLE_CHOICE -> "单选题（4个选项，1个正确答案）";
            case MULTIPLE_CHOICE -> "多选题（4个及以上选项，1个或多个正确答案，答案以逗号分隔如 A,B";
            case TRUE_FALSE -> "判断题（True/False）";
        };

        return """
                你是一个专业的在线学习平台出题专家。请根据以下材料生成 %d 道 %s。

                要求：
                - 题目内容简洁准确，选项不重复
                - 难度适中（difficulty=3）
                - 多选题答案以英文逗号分隔（如 A,C）
                - 判断题答案为 True 或 False

                请严格按以下JSON格式返回（不要有其他内容，只返回JSON数组）：
                [
                  {
                    "content": "题目内容",
                    "options": ["选项A", "选项B", "选项C", "选项D"],
                    "answer": "正确答案索引或内容",
                    "difficulty": 3
                  }
                ]

                材料内容：
                %s
                """.formatted(request.getCount(), typeDesc, request.getMaterial());
    }

    private String callLlm(String prompt) {
        try {
            String url = "https://api.siliconflow.cn/v1/chat/completions";

            Map<String, Object> body = new HashMap<>();
            body.put("model", model);
            body.put("messages", List.of(Map.of("role", "user", "content", prompt)));
            body.put("temperature", 0.7);

            var headers = new org.springframework.http.HttpHeaders();
            headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + apiKey);

            var entity = new org.springframework.http.HttpEntity<>(body, headers);
            var response = restTemplate.postForEntity(url, entity, String.class);

            JsonNode root = mapper.readTree(response.getBody());
            return root.path("choices").get(0).path("message").path("content").asText();
        } catch (Exception e) {
            log.error("SiliconFlow LLM 调用失败", e);
            throw new RuntimeException("AI 生成失败：" + e.getMessage());
        }
    }

    private List<QuestionDto> parseLlmResponse(String response, QuestionType defaultType) {
        List<QuestionDto> result = new ArrayList<>();
        try {
            // 尝试提取 JSON 数组（可能有 markdown 包装）
            String jsonStr = response.trim();
            if (jsonStr.startsWith("```")) {
                // 去掉 markdown 代码块
                jsonStr = jsonStr.replaceAll("```(?:json)?", "").trim();
            }

            JsonNode root = mapper.readTree(jsonStr);
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
                    for (JsonNode o : opts) options.add(o.asText());
                }
                dto.setOptions(options);

                String answer = node.path("answer").asText();
                // 多选题：如果答案是索引（0,1,2,3）转成字母
                if (defaultType == QuestionType.MULTIPLE_CHOICE && answer.matches("\\d[,\\d]*")) {
                    String[] indices = answer.split(",");
                    answer = Arrays.stream(indices)
                            .map(s -> String.valueOf((char) ('A' + Integer.parseInt(s.trim())))
                            ).reduce("", (a, b) -> a.isEmpty() ? b : a + "," + b);
                } else if (defaultType == QuestionType.SINGLE_CHOICE && answer.matches("\\d")) {
                    answer = String.valueOf((char) ('A' + Integer.parseInt(answer)));
                } else if (defaultType == QuestionType.TRUE_FALSE) {
                    answer = answer.equalsIgnoreCase("true") || answer.equals("1") ? "True" : "False";
                }
                dto.setAnswer(answer);
                result.add(dto);
            }
        } catch (Exception e) {
            log.error("LLM 响应解析失败: {}", response, e);
            throw new RuntimeException("AI 返回格式解析失败，请重试。原始响应：" + response.substring(0, Math.min(200, response.length())));
        }
        return result;
    }
}
