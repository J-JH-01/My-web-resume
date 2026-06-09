package com.jjh.jpstudy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.jjh.jpstudy.dto.Quiz;

@Mapper
public interface QuizMapper {

    List<Quiz> selectRandomQuizList(@Param("limit") int limit);
}