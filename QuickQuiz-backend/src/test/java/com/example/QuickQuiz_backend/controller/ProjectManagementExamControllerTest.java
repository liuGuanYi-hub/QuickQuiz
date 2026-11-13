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
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ProjectManagementExamControllerTest {

    private static final Set<Integer> UNSCORED = Set.of(62, 63, 64, 114, 116, 117);
    private static final Map<Integer, ChapterTestSpec> CHAPTERS = Map.of(
            1, new ChapterTestSpec("项目基础与立项", 1, 31, 31, 31, 26, 0, 5),
            2, new ChapterTestSpec("需求与范围管理", 32, 54, 23, 23, 15, 5, 3),
            3, new ChapterTestSpec("成本管理", 55, 100, 46, 43, 20, 17, 9),
            4, new ChapterTestSpec("进度与计划管理", 101, 155, 55, 52, 26, 18, 11),
            5, new ChapterTestSpec("风险管理", 156, 216, 61, 61, 36, 19, 6),
            6, new ChapterTestSpec("配置与变更管理", 217, 279, 63, 63, 22, 20, 21),
            7, new ChapterTestSpec("人力与资源管理", 280, 329, 50, 50, 30, 20, 0),
            8, new ChapterTestSpec("质量管理与 CMMI", 330, 391, 62, 62, 36, 20, 6)
    );

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
                                {"username": "projectmanager", "password": "test123"}
                                """))
                .andExpect(status().isOk());

        var loginResponse = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "projectmanager", "password": "test123"}
                                """))
                .andExpect(status().isOk())
                .andReturn();

        authToken = loginResponse.getResponse().getContentAsString()
                .replaceAll(".*\"token\":\"([^\"]+)\".*", "$1");
    }

    @Test
    void shouldAcceptAllEightChapterExamShapes() throws Exception {
        for (int chapter = 1; chapter <= 8; chapter++) {
            ChapterTestSpec spec = CHAPTERS.get(chapter);
            mockMvc.perform(post("/api/project-management-exam/chapters/{chapter}/submit", chapter)
                            .header("Authorization", "Bearer " + authToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(buildSubmission(chapter, spec.totalCount(), false))))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.chapter").value(chapter))
                    .andExpect(jsonPath("$.chapterTitle").value(spec.title()))
                    .andExpect(jsonPath("$.totalQuestionCount").value(spec.totalCount()))
                    .andExpect(jsonPath("$.questionCount").value(spec.scoredCount()))
                    .andExpect(jsonPath("$.correctCount").value(spec.scoredCount()))
                    .andExpect(jsonPath("$.score").value(100));
        }
    }

    @Test
    void shouldSaveChapterScoreAndProjectManagementWrongQuestion() throws Exception {
        mockMvc.perform(post("/api/project-management-exam/chapters/3/submit")
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(buildSubmission(3, 46, true))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalQuestionCount").value(46))
                .andExpect(jsonPath("$.questionCount").value(43))
                .andExpect(jsonPath("$.correctCount").value(42))
                .andExpect(jsonPath("$.score").value(97.67))
                .andExpect(jsonPath("$.wrongQuestionsSaved").value(1));

        mockMvc.perform(get("/api/wrong-questions")
                        .header("Authorization", "Bearer " + authToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].source").value("PROJECT_MANAGEMENT_EXAM"))
                .andExpect(jsonPath("$[0].examKey").value("PROJECT_MANAGEMENT"))
                .andExpect(jsonPath("$[0].chapter").value(3))
                .andExpect(jsonPath("$[0].staticQuestionId").value("pm-055"));
    }

    @Test
    void shouldRejectSubmissionWithoutAllChapterQuestions() throws Exception {
        mockMvc.perform(post("/api/project-management-exam/chapters/3/submit")
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(buildSubmission(3, 45, false))))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("第3套固定卷必须提交46道题"));
    }

    @Test
    @SuppressWarnings("unchecked")
    void shouldRejectQuestionFromAnotherChapter() throws Exception {
        Map<String, Object> request = buildSubmission(3, 46, false);
        List<Map<String, Object>> answers = (List<Map<String, Object>>) request.get("answers");
        answers.get(45).put("questionId", "pm-101");
        answers.get(45).put("questionNumber", 101);

        mockMvc.perform(post("/api/project-management-exam/chapters/3/submit")
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("提交中包含其他章节题目"));
    }

    @Test
    @SuppressWarnings("unchecked")
    void shouldRejectDuplicateQuestion() throws Exception {
        Map<String, Object> request = buildSubmission(2, 23, false);
        List<Map<String, Object>> answers = (List<Map<String, Object>>) request.get("answers");
        answers.get(22).put("questionId", answers.get(21).get("questionId"));
        answers.get(22).put("questionNumber", answers.get(21).get("questionNumber"));

        mockMvc.perform(post("/api/project-management-exam/chapters/2/submit")
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("提交中存在重复题目"));
    }

    @Test
    void shouldRejectInvalidChapter() throws Exception {
        mockMvc.perform(post("/api/project-management-exam/chapters/9/submit")
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(buildSubmission(1, 31, false))))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("项目管理章节必须为1至8"));
    }

    @Test
    @SuppressWarnings("unchecked")
    void shouldRequireAllScoredSubjectiveQuestionsToBeAssessed() throws Exception {
        Map<String, Object> request = buildSubmission(1, 31, false);
        List<Map<String, Object>> answers = (List<Map<String, Object>>) request.get("answers");
        Map<String, Object> subjective = answers.stream()
                .filter(answer -> "SUBJECTIVE".equals(answer.get("questionType")))
                .findFirst()
                .orElseThrow();
        subjective.put("selfAssessed", false);

        mockMvc.perform(post("/api/project-management-exam/chapters/1/submit")
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("本章所有计分主观题必须完成自评"));
    }

    private Map<String, Object> buildSubmission(int chapter, int count, boolean firstScoredWrong) {
        ChapterTestSpec spec = CHAPTERS.get(chapter);
        Set<Integer> subjectiveNumbers = new HashSet<>();
        for (int number = spec.start(); number <= spec.end(); number++) {
            if (UNSCORED.contains(number)) {
                subjectiveNumbers.add(number);
            }
        }
        for (int number = spec.start(); subjectiveNumbers.size() < spec.subjectiveCount(); number++) {
            subjectiveNumbers.add(number);
        }

        Set<Integer> singleChoiceNumbers = new HashSet<>();
        for (int number = spec.start(); singleChoiceNumbers.size() < spec.singleChoiceCount(); number++) {
            if (!subjectiveNumbers.contains(number)) {
                singleChoiceNumbers.add(number);
            }
        }

        List<Map<String, Object>> answers = new ArrayList<>();
        boolean wrongAssigned = false;
        for (int number = spec.start(); number <= spec.end() && answers.size() < count; number++) {
            boolean scored = !UNSCORED.contains(number);
            String type = subjectiveNumbers.contains(number)
                    ? "SUBJECTIVE"
                    : singleChoiceNumbers.contains(number)
                    ? "SINGLE_CHOICE"
                    : "TRUE_FALSE";
            boolean correct = scored;
            if (firstScoredWrong && scored && !wrongAssigned) {
                correct = false;
                wrongAssigned = true;
            }

            Map<String, Object> answer = new LinkedHashMap<>();
            answer.put("questionId", "pm-%03d".formatted(number));
            answer.put("questionNumber", number);
            answer.put("moduleIndex", chapter);
            answer.put("moduleTitle", spec.title());
            answer.put("questionType", type);
            answer.put("content", "测试题目 " + number);
            answer.put("options", "SUBJECTIVE".equals(type)
                    ? List.of()
                    : List.of("选项A", "选项B", "选项C", "选项D"));
            answer.put("userAnswer", correct ? "A" : "B");
            answer.put("correctAnswer", "A");
            answer.put("analysis", "测试解析");
            answer.put("scored", scored);
            answer.put("correct", correct);
            answer.put("selfAssessed", scored && "SUBJECTIVE".equals(type));
            answers.add(answer);
        }

        Map<String, Object> request = new LinkedHashMap<>();
        request.put("answers", answers);
        request.put("durationSeconds", 1800);
        return request;
    }

    private record ChapterTestSpec(
            String title,
            int start,
            int end,
            int totalCount,
            int scoredCount,
            int singleChoiceCount,
            int trueFalseCount,
            int subjectiveCount
    ) {
    }
}
