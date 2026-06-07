package com.jjh.jpstudy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jjh.jpstudy.dto.Word;
import com.jjh.jpstudy.mapper.WordMapper;

@Service
public class WordServiceImpl implements WordService {

    private final WordMapper mapper;

    public WordServiceImpl(WordMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public List<Word> selectWordList() {
        return mapper.selectWordList();
    }
    
    @Override
    public Word selectWordDetail(int wordNo) {
        return mapper.selectWordDetail(wordNo);
    }
}