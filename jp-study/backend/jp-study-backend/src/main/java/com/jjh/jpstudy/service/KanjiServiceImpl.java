package com.jjh.jpstudy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jjh.jpstudy.dto.Kanji;
import com.jjh.jpstudy.mapper.KanjiMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KanjiServiceImpl implements KanjiService {

    private final KanjiMapper kanjiMapper;

    @Override
    public List<Kanji> selectKanjiList() {
        return kanjiMapper.selectKanjiList();
    }

    @Override
    public Kanji selectKanji(int kanjiNo) {
        return kanjiMapper.selectKanji(kanjiNo);
    }
}