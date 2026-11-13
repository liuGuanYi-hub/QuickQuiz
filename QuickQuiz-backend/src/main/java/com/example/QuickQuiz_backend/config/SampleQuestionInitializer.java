package com.example.QuickQuiz_backend.config;

import com.example.QuickQuiz_backend.entity.MultipleChoiceQuestion;
import com.example.QuickQuiz_backend.entity.Question;
import com.example.QuickQuiz_backend.entity.QuestionType;
import com.example.QuickQuiz_backend.entity.SingleChoiceQuestion;
import com.example.QuickQuiz_backend.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class SampleQuestionInitializer implements CommandLineRunner {

    private final QuestionRepository questionRepository;

    @Override
    public void run(String... args) {
        long currentCount = questionRepository.count();
        if (currentCount >= 10) {
            return;
        }

        List<Question> samples = List.of(
                single("计算机硬件系统的核心部件是（）", List.of("A. 硬盘", "B. 内存", "C. CPU", "D. 显卡"), "C", 1),
                single("HTTP 协议默认使用的端口是（）", List.of("A. 21", "B. 22", "C. 80", "D. 443"), "C", 1),
                single("Java 中用于定义类的关键字是（）", List.of("A. class", "B. interface", "C. enum", "D. object"), "A", 1),
                single("关系型数据库中用于查询数据的关键字是（）", List.of("A. INSERT", "B. SELECT", "C. UPDATE", "D. DELETE"), "B", 1),
                single("React 中用于保存组件状态的 Hook 是（）", List.of("A. useState", "B. useMemo", "C. useRef", "D. useEffect"), "A", 2),
                multi("以下哪些属于前端技术？", List.of("A. HTML", "B. CSS", "C. JavaScript", "D. MySQL"), "A,B,C", 2),
                multi("以下哪些是常见的 HTTP 请求方法？", List.of("A. GET", "B. POST", "C. PUT", "D. SAVE"), "A,B,C", 2),
                tf("Spring Boot 可以用于构建后端 Web 服务。", "True", 1),
                tf("JWT 通常用于无状态身份认证。", "True", 2),
                tf("CSS 的主要作用是处理数据库事务。", "False", 1)
        );

        int need = (int) Math.min(10 - currentCount, samples.size());
        questionRepository.saveAll(samples.subList(0, need));
    }

    private Question single(String content, List<String> options, String answer, int difficulty) {
        return SingleChoiceQuestion.builder()
                .type(QuestionType.SINGLE_CHOICE)
                .content(content)
                .options(options)
                .answer(answer)
                .difficulty(difficulty)
                .build();
    }

    private Question multi(String content, List<String> options, String answer, int difficulty) {
        return MultipleChoiceQuestion.builder()
                .type(QuestionType.MULTIPLE_CHOICE)
                .content(content)
                .options(options)
                .answer(answer)
                .difficulty(difficulty)
                .build();
    }

    private Question tf(String content, String answer, int difficulty) {
        return Question.TrueFalseQuestion.builder()
                .type(QuestionType.TRUE_FALSE)
                .content(content)
                .options(List.of("True", "False"))
                .answer(answer)
                .difficulty(difficulty)
                .build();
    }
}
