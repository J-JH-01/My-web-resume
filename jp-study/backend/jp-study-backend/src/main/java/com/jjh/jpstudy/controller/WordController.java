package com.jjh.jpstudy.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jjh.jpstudy.dto.Word;
import com.jjh.jpstudy.service.WordService;

@RestController
public class WordController {

    private final WordService service;

    public WordController(WordService service) {
        this.service = service;
    }

    @GetMapping("/api/words")
    public List<Word> selectWordList() {
        return service.selectWordList();
    }
}