package com.jjh.jpstudy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jjh.jpstudy.dto.Quiz;
import com.jjh.jpstudy.mapper.QuizMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizMapper quizMapper;

    @Override
    public List<Quiz> selectRandomQuizList(int limit) {

        if (limit <= 0) {
            limit = 10;
        }

        if (limit > 50) {
            limit = 50;
        }

        return quizMapper.selectRandomQuizList(limit);
    }
}