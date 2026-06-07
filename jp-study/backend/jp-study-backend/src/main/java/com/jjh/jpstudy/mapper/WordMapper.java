package com.jjh.jpstudy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.jjh.jpstudy.dto.Word;

@Mapper
public interface WordMapper {

    List<Word> selectWordList();
}