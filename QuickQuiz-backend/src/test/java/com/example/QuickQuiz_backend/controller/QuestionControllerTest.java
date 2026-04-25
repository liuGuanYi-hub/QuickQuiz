package com.example.QuickQuiz_backend.controller;

import com.example.QuickQuiz_backend.dto.QuestionDto;
import com.example.QuickQuiz_backend.entity.QuestionType;
import com.example.QuickQuiz_backend.entity.SingleChoiceQuestion;
import com.example.QuickQuiz_backend.repository.QuestionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class QuestionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private QuestionRepository questionRepository;

    private String authToken;

    @BeforeEach
    void setUp() throws Exception {
        questionRepository.deleteAll();

        // 注册并登录获取 token
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"username": "testuser", "password": "test123"}
                    """))
                .andExpect(status().isOk());

        var loginRes = mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"username": "testuser", "password": "test123"}
                    """))
                .andExpect(status().isOk())
                .andReturn();

        authToken = loginRes.getResponse().getContentAsString()
                .replaceAll(".*\"token\":\"([^\"]+)\".*", "$1");
    }

    @Test
    @WithMockUser(username = "testuser")
    void shouldCreateQuestion() throws Exception {
        QuestionDto dto = QuestionDto.builder()
                .content("Java 是面向对象的吗？")
                .type(QuestionType.SINGLE_CHOICE)
                .options(List.of("是", "否", "不确定", "以上都不是"))
                .answer("A")
                .difficulty(2)
                .build();

        mockMvc.perform(post("/api/questions")
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("Java 是面向对象的吗？"))
                .andExpect(jsonPath("$.answer").value("A"));
    }

    @Test
    @WithMockUser(username = "testuser")
    void shouldGetQuestionsWithPagination() throws Exception {
        // 创建几条题目
        for (int i = 0; i < 5; i++) {
            questionRepository.save(SingleChoiceQuestion.builder()
                    .content("题目 " + i)
                    .answer("A")
                    .difficulty(3)
                    .options(List.of("选项A", "选项B", "选项C", "选项D"))
                    .type(QuestionType.SINGLE_CHOICE)
                    .build());
        }

        mockMvc.perform(get("/api/questions")
                        .header("Authorization", "Bearer " + authToken)
                        .param("page", "0")
                        .param("size", "3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(3)))
                .andExpect(jsonPath("$.totalElements").value(5));
    }

    @Test
    @WithMockUser(username = "testuser")
    void shouldSearchQuestions() throws Exception {
        questionRepository.save(SingleChoiceQuestion.builder()
                .content("什么是多线程？")
                .answer("A")
                .difficulty(3)
                .options(List.of("A", "B", "C", "D"))
                .type(QuestionType.SINGLE_CHOICE)
                .build());

        mockMvc.perform(get("/api/questions")
                        .header("Authorization", "Bearer " + authToken)
                        .param("search", "多线程"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(1)))
                .andExpect(jsonPath("$.content[0].content").value("什么是多线程？"));
    }

    @Test
    @WithMockUser(username = "testuser")
    void shouldDeleteQuestion() throws Exception {
        var q = questionRepository.save(SingleChoiceQuestion.builder()
                .content("删除测试题")
                .answer("A")
                .difficulty(1)
                .options(List.of("A", "B", "C", "D"))
                .type(QuestionType.SINGLE_CHOICE)
                .build());

        mockMvc.perform(delete("/api/questions/" + q.getId())
                        .header("Authorization", "Bearer " + authToken))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/questions/" + q.getId())
                        .header("Authorization", "Bearer " + authToken))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(username = "testuser")
    void shouldRejectInvalidQuestion() throws Exception {
        QuestionDto dto = QuestionDto.builder()
                .content("")  // 空内容
                .type(QuestionType.SINGLE_CHOICE)
                .options(List.of())
                .answer("A")
                .difficulty(3)
                .build();

        mockMvc.perform(post("/api/questions")
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest());
    }
}
