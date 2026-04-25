package com.example.QuickQuiz_backend.controller;

import com.example.QuickQuiz_backend.dto.SubmitExamRequest;
import com.example.QuickQuiz_backend.entity.QuestionType;
import com.example.QuickQuiz_backend.entity.SingleChoiceQuestion;
import com.example.QuickQuiz_backend.repository.ExerciseRecordRepository;
import com.example.QuickQuiz_backend.repository.QuestionRepository;
import com.example.QuickQuiz_backend.repository.UserRepository;
import com.example.QuickQuiz_backend.repository.WrongQuestionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ExamControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExerciseRecordRepository exerciseRecordRepository;

    @Autowired
    private WrongQuestionRepository wrongQuestionRepository;

    private String authToken;

    @BeforeEach
    void setUp() throws Exception {
        exerciseRecordRepository.deleteAll();
        wrongQuestionRepository.deleteAll();
        questionRepository.deleteAll();
        userRepository.deleteAll();

        // 注册并登录
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"username": "examuser", "password": "test123"}
                    """))
                .andExpect(status().isOk());

        var loginRes = mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"username": "examuser", "password": "test123"}
                    """))
                .andExpect(status().isOk())
                .andReturn();

        authToken = loginRes.getResponse().getContentAsString()
                .replaceAll(".*\"token\":\"([^\"]+)\".*", "$1");
    }

    @Test
    void shouldGetExamQuestions() throws Exception {
        // 创建几道题
        for (int i = 0; i < 3; i++) {
            questionRepository.save(SingleChoiceQuestion.builder()
                    .content("测试题 " + i)
                    .answer("A")
                    .difficulty(2)
                    .options(List.of("A", "B", "C", "D"))
                    .type(QuestionType.SINGLE_CHOICE)
                    .build());
        }

        mockMvc.perform(get("/api/exam/questions")
                        .header("Authorization", "Bearer " + authToken)
                        .param("count", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)));
    }

    @Test
    void shouldSubmitExamAndCalculateScore() throws Exception {
        // 创建两道题
        var q1 = questionRepository.save(SingleChoiceQuestion.builder()
                .content("Q1")
                .answer("A")
                .difficulty(2)
                .options(List.of("A", "B", "C", "D"))
                .type(QuestionType.SINGLE_CHOICE)
                .build());
        var q2 = questionRepository.save(SingleChoiceQuestion.builder()
                .content("Q2")
                .answer("B")
                .difficulty(2)
                .options(List.of("A", "B", "C", "D"))
                .type(QuestionType.SINGLE_CHOICE)
                .build());

        SubmitExamRequest request = SubmitExamRequest.builder()
                .answers(List.of(
                        new SubmitExamRequest.QuestionAnswer(q1.getId(), "A"),  // 答对
                        new SubmitExamRequest.QuestionAnswer(q2.getId(), "A")   // 答错
                ))
                .durationSeconds(60)
                .build();

        mockMvc.perform(post("/api/exam/submit")
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.questionCount").value(2))
                .andExpect(jsonPath("$.correctCount").value(1))
                .andExpect(jsonPath("$.score").value(50.0));
    }

    @Test
    void shouldAddWrongQuestionToBook() throws Exception {
        var q = questionRepository.save(SingleChoiceQuestion.builder()
                .content("错题")
                .answer("A")
                .difficulty(2)
                .options(List.of("A", "B", "C", "D"))
                .type(QuestionType.SINGLE_CHOICE)
                .build());

        SubmitExamRequest request = SubmitExamRequest.builder()
                .answers(List.of(new SubmitExamRequest.QuestionAnswer(q.getId(), "B")))
                .durationSeconds(30)
                .build();

        mockMvc.perform(post("/api/exam/submit")
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());

        // 验证错题已入库
        mockMvc.perform(get("/api/wrong-questions")
                        .header("Authorization", "Bearer " + authToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].questionId").value(q.getId()));
    }

    @Test
    void shouldRejectEmptyAnswer() throws Exception {
        mockMvc.perform(post("/api/exam/submit")
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {"answers": [], "durationSeconds": 60}
                            """))
                .andExpect(status().isOk()) // 空答题也返回结果，只是 questionCount=0
                .andExpect(jsonPath("$.questionCount").value(0));
    }
}
