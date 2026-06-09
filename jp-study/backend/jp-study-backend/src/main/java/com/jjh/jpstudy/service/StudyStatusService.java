package com.jjh.jpstudy.service;

import java.util.List;

import com.jjh.jpstudy.dto.StudyStatus;

public interface StudyStatusService {

    int saveStudyStatus(StudyStatus studyStatus);

    List<StudyStatus> selectMyStudyStatusList(int memberNo);
}