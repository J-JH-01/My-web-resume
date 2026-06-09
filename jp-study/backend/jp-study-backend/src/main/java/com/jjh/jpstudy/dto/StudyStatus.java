package com.jjh.jpstudy.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StudyStatus {

    private int statusNo;
    private int memberNo;
    private String contentType;  // WORD / KANJI
    private int contentNo;      // wordNo / kanjiNo
    private String studyStatus; // KNOWN / VAGUE / UNKNOWN
    private String createdAt;
    private String updatedAt;
    private String deleteFl;
}