package com.example.QuickQuiz_backend.ai;

import com.example.QuickQuiz_backend.dto.AiGenerateRequest;
import com.example.QuickQuiz_backend.dto.QuestionDto;

import java.util.List;

/**
 * AI 出题Provider接口，支持切换不同LLM后端
 */
public interface AiProvider {

    /**
     * 根据文本材料生成题目
     * @param request 生成请求
     * @return 生成的题目列表
     */
    List<QuestionDto> generateQuestions(AiGenerateRequest request);

    /**
     * 提供者名称（用于配置和日志）
     */
    String getProviderName();

    /**
     * 是否启用
     */
    boolean isEnabled();
}
