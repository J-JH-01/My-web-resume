package com.jjh.jpstudy.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jjh.jpstudy.dto.Quiz;
import com.jjh.jpstudy.service.QuizService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @GetMapping
    public List<Quiz> selectRandomQuizList(
            @RequestParam(value = "limit", defaultValue = "10") int limit) {
        return quizService.selectRandomQuizList(limit);
    }
}