package com.jjh.jpstudy.service;

import java.util.List;

import com.jjh.jpstudy.dto.Word;

public interface WordService {

	 // 단어 목록 조회
    List<Word> selectWordList();

    // 단어 상세 조회
    Word selectWordDetail(int wordNo);
}