package com.jjh.jpstudy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.jjh.jpstudy.dto.Kanji;

@Mapper
public interface KanjiMapper {

    List<Kanji> selectKanjiList();

    Kanji selectKanji(@Param("kanjiNo") int kanjiNo);
}