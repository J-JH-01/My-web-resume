package com.jjh.jpstudy.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Quiz {

    private String quizType;      // WORD / KANJI
    private int itemNo;           // wordNo 또는 kanjiNo
    private String questionText;  // 話す, 水
    private String readingText;   // はなす, スイ / みず
    private String answerText;    // 이야기하다, 물
    private String description;
}