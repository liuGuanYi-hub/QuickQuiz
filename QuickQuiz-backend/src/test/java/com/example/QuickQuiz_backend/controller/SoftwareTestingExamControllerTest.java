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
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class SoftwareTestingExamControllerTest {

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
                                {"username": "softwaretester", "password": "test123"}
                                """))
                .andExpect(status().isOk());

        var loginResponse = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "softwaretester", "password": "test123"}
                                """))
                .andExpect(status().isOk())
                .andReturn();

        authToken = loginResponse.getResponse().getContentAsString()
                .replaceAll(".*\"token\":\"([^\"]+)\".*", "$1");
    }

    @Test
    void shouldSaveSoftwareTestingScoreAndWrongQuestion() throws Exception {
        mockMvc.perform(post("/api/software-testing-exam/sets/practice-5/submit")
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(buildPracticeFiveSubmission(true, true))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.setId").value("practice-5"))
                .andExpect(jsonPath("$.setTitle").value("软件测试练习 5"))
                .andExpect(jsonPath("$.questionCount").value(6))
                .andExpect(jsonPath("$.correctCount").value(5))
                .andExpect(jsonPath("$.score").value(83.33))
                .andExpect(jsonPath("$.wrongQuestionsSaved").value(1));

        mockMvc.perform(get("/api/wrong-questions")
                        .header("Authorization", "Bearer " + authToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].source").value("SOFTWARE_TESTING_EXAM"))
                .andExpect(jsonPath("$[0].examKey").value("SOFTWARE_TESTING"))
                .andExpect(jsonPath("$[0].chapter").value(5))
                .andExpect(jsonPath("$[0].chapterTitle").value("软件测试练习 5"))
                .andExpect(jsonPath("$[0].staticQuestionId").value("st-030"));
    }

    @Test
    void shouldRejectSubmissionWithoutAllSetQuestions() throws Exception {
        Map<String, Object> request = buildPracticeFiveSubmission(false, true);
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> answers = (List<Map<String, Object>>) request.get("answers");
        answers.remove(answers.size() - 1);

        mockMvc.perform(post("/api/software-testing-exam/sets/practice-5/submit")
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("第5套固定卷必须提交6道题"));
    }

    @Test
    void shouldRequireSubjectiveQuestionsToBeAssessed() throws Exception {
        mockMvc.perform(post("/api/software-testing-exam/sets/practice-5/submit")
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(buildPracticeFiveSubmission(false, false))))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("本套简答题必须完成自评后才能保存"));
    }

    private Map<String, Object> buildPracticeFiveSubmission(boolean firstWrong, boolean subjectiveAssessed) {
        List<Map<String, Object>> answers = new ArrayList<>();
        String[] types = {
                "SINGLE_CHOICE",
                "SINGLE_CHOICE",
                "FILL_BLANK",
                "FILL_BLANK",
                "FILL_BLANK",
                "SUBJECTIVE"
        };

        for (int i = 0; i < types.length; i++) {
            int questionNumber = 30 + i;
            boolean subjective = "SUBJECTIVE".equals(types[i]);
            boolean correct = !(firstWrong && i == 0);
            Map<String, Object> answer = new LinkedHashMap<>();
            answer.put("questionId", "st-%03d".formatted(questionNumber));
            answer.put("questionNumber", questionNumber);
            answer.put("setId", "practice-5");
            answer.put("setOrder", 5);
            answer.put("setTitle", "软件测试练习 5");
            answer.put("questionType", types[i]);
            answer.put("content", "软件测试题目 " + questionNumber);
            answer.put("options", subjective || "FILL_BLANK".equals(types[i])
                    ? List.of()
                    : List.of("选项A", "选项B", "选项C", "选项D"));
            answer.put("userAnswer", correct ? "A" : "B");
            answer.put("correctAnswer", "A");
            answer.put("analysis", "测试解析");
            answer.put("correct", subjective ? subjectiveAssessed : correct);
            answer.put("selfAssessed", subjective && subjectiveAssessed);
            answers.add(answer);
        }

        Map<String, Object> request = new LinkedHashMap<>();
        request.put("answers", answers);
        request.put("durationSeconds", 900);
        return request;
    }
}
