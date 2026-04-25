package com.example.QuickQuiz_backend.ocr;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * OCR 文字识别Provider接口，支持切换不同OCR后端
 */
public interface OcrProvider {

    /**
     * 从图片中识别文字
     * @param image 图片文件
     * @return 识别出的文本内容
     */
    String recognizeText(MultipartFile image) throws IOException;

    String getProviderName();

    boolean isEnabled();
}
