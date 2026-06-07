package com.jjh.jpstudy.dto;

public class StudyItem {

    private int itemNo;
    private String itemText;
    private String itemReading;
    private String meaning;

    public StudyItem() {
    }

    public StudyItem(int itemNo, String itemText, String itemReading, String meaning) {
        this.itemNo = itemNo;
        this.itemText = itemText;
        this.itemReading = itemReading;
        this.meaning = meaning;
    }

    public int getItemNo() {
        return itemNo;
    }

    public void setItemNo(int itemNo) {
        this.itemNo = itemNo;
    }

    public String getItemText() {
        return itemText;
    }

    public void setItemText(String itemText) {
        this.itemText = itemText;
    }

    public String getItemReading() {
        return itemReading;
    }

    public void setItemReading(String itemReading) {
        this.itemReading = itemReading;
    }

    public String getMeaning() {
        return meaning;
    }

    public void setMeaning(String meaning) {
        this.meaning = meaning;
    }
}