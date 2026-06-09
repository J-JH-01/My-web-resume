package com.jjh.jpstudy.service;

import java.util.List;

import com.jjh.jpstudy.dto.Quiz;

public interface QuizService {

    List<Quiz> selectRandomQuizList(int limit);
}