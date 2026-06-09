package com.jjh.jpstudy.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jjh.jpstudy.dto.Kanji;
import com.jjh.jpstudy.service.KanjiService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/kanji")
@RequiredArgsConstructor
public class KanjiController {

    private final KanjiService kanjiService;

    @GetMapping
    public List<Kanji> selectKanjiList() {
        return kanjiService.selectKanjiList();
    }

    @GetMapping("/{kanjiNo}")
    public Kanji selectKanji(@PathVariable("kanjiNo") int kanjiNo) {
        return kanjiService.selectKanji(kanjiNo);
    }
}