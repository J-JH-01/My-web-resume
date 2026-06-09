package com.jjh.jpstudy.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Kanji {

    private int kanjiNo;
    private String kanjiText;
    private String onReading;
    private String kunReading;
    private String meaningText;
    private String description;

    private String exampleText;
    private String exampleReading;
    private String exampleMeaning;
}