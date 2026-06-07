package com.jjh.jpstudy.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.jjh.jpstudy.dto.Word;
import com.jjh.jpstudy.service.WordService;

@RestController
public class WordController {

    private final WordService service;

    public WordController(WordService service) {
        this.service = service;
    }

    // 단어 목록 조회
    @GetMapping("/api/words")
    public List<Word> selectWordList() {
        return service.selectWordList();
    }

    // 단어 상세 조회
    @GetMapping("/api/words/{wordNo}")
    public Word selectWordDetail(@PathVariable("wordNo") int wordNo) {
        return service.selectWordDetail(wordNo);
    }
}