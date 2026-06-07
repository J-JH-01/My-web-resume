package com.jjh.jpstudy.dto;

public class Word {

    private int wordNo;
    private String wordText;
    private String furigana;
    private String partOfSpeech;
    private String jlptLevel;
    private String wordDescription;
    private String meaningText;

    public Word() {}

    public int getWordNo() {
        return wordNo;
    }

    public void setWordNo(int wordNo) {
        this.wordNo = wordNo;
    }

    public String getWordText() {
        return wordText;
    }

    public void setWordText(String wordText) {
        this.wordText = wordText;
    }

    public String getFurigana() {
        return furigana;
    }

    public void setFurigana(String furigana) {
        this.furigana = furigana;
    }

    public String getPartOfSpeech() {
        return partOfSpeech;
    }

    public void setPartOfSpeech(String partOfSpeech) {
        this.partOfSpeech = partOfSpeech;
    }

    public String getJlptLevel() {
        return jlptLevel;
    }

    public void setJlptLevel(String jlptLevel) {
        this.jlptLevel = jlptLevel;
    }

    public String getWordDescription() {
        return wordDescription;
    }

    public void setWordDescription(String wordDescription) {
        this.wordDescription = wordDescription;
    }

    public String getMeaningText() {
        return meaningText;
    }

    public void setMeaningText(String meaningText) {
        this.meaningText = meaningText;
    }
}