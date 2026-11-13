package com.example.QuickQuiz_backend.controller;

import com.example.QuickQuiz_backend.repository.ExerciseRecordRepository;
import com.example.QuickQuiz_backend.repository.UserRepository;
import com.example.QuickQuiz_backend.repository.WebExamWrongQuestionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.ActiveProfiles;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.hamcrest.Matchers.lessThan;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class WebExamControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ExerciseRecordRepository exerciseRecordRepository;

    @Autowired
    private WebExamWrongQuestionRepository webExamWrongQuestionRepository;

    @Autowired
    private UserRepository userRepository;

    private String authToken;

    @BeforeEach
    void setUp() throws Exception {
        webExamWrongQuestionRepository.deleteAll();
        exerciseRecordRepository.deleteAll();
        userRepository.deleteAll();

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "webexamuser", "password": "test123"}
                                """))
                .andExpect(status().isOk());

        var loginResponse = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "webexamuser", "password": "test123"}
                                """))
                .andExpect(status().isOk())
                .andReturn();

        authToken = loginResponse.getResponse().getContentAsString()
                .replaceAll(".*\"token\":\"([^\"]+)\".*", "$1");
    }

    @Test
    void shouldSaveRecordAndMergeWrongQuestionIntoWrongBook() throws Exception {
        Map<String, Object> request = buildSubmission(41);

        mockMvc.perform(post("/api/web-exam/submit")
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.questionCount").value(41))
                .andExpect(jsonPath("$.correctCount").value(39))
                .andExpect(jsonPath("$.score").value(98))
                .andExpect(jsonPath("$.wrongQuestionsSaved").value(1));

        mockMvc.perform(get("/api/wrong-questions")
                        .header("Authorization", "Bearer " + authToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].source").value("WEB_EXAM"))
                .andExpect(jsonPath("$[0].staticQuestionId").value("single-01"))
                .andExpect(jsonPath("$[0].id", lessThan(0)))
                .andExpect(jsonPath("$[0].wrongCount").value(1));
    }

    @Test
    void shouldRejectSubmissionWithoutAllFortyOneQuestions() throws Exception {
        Map<String, Object> request = buildSubmission(40);

        mockMvc.perform(post("/api/web-exam/submit")
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Web前端固定卷必须提交41道题"));
    }

    private Map<String, Object> buildSubmission(int count) {
        List<Map<String, Object>> answers = new ArrayList<>();
        int objectiveCount = Math.min(count, 40);
        for (int i = 0; i < objectiveCount; i++) {
            boolean wrong = i == 0;
            Map<String, Object> answer = new LinkedHashMap<>();
            answer.put("questionId", String.format("single-%02d", i + 1));
            answer.put("chapter", i % 14 + 1);
            answer.put("chapterTitle", "章节");
            answer.put("questionType", "SINGLE_CHOICE");
            answer.put("content", "测试题目 " + (i + 1));
            answer.put("options", List.of("选项A", "选项B", "选项C", "选项D"));
            answer.put("userAnswer", wrong ? "B" : "A");
            answer.put("correctAnswer", "A");
            answer.put("analysis", "测试解析");
            answer.put("correct", !wrong);
            answer.put("earnedScore", wrong ? 0 : 2);
            answers.add(answer);
        }

        if (count == 41) {
            Map<String, Object> operation = new LinkedHashMap<>();
            operation.put("questionId", "operation-01");
            operation.put("chapter", 14);
            operation.put("chapterTitle", "综合操作");
            operation.put("questionType", "OPERATION");
            operation.put("content", "操作题");
            operation.put("options", List.of());
            operation.put("userAnswer", "<section></section>");
            operation.put("correctAnswer", "");
            operation.put("analysis", "操作题自评");
            operation.put("correct", false);
            operation.put("earnedScore", 0);
            answers.add(operation);
        }

        Map<String, Object> request = new LinkedHashMap<>();
        request.put("answers", answers);
        request.put("durationSeconds", 600);
        request.put("operationScore", 20);
        return request;
    }
}
