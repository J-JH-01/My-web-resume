package com.jjh.jpstudy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.jjh.jpstudy.dto.Word;

@Mapper
public interface WordMapper {

    List<Word> selectWordList();

    Word selectWordDetail(@Param("wordNo") int wordNo);
}