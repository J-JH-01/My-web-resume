package com.jjh.jpstudy.service;

import java.util.List;

import com.jjh.jpstudy.dto.Kanji;

public interface KanjiService {

    List<Kanji> selectKanjiList();

    Kanji selectKanji(int kanjiNo);
}