package com.jjh.jpstudy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.jjh.jpstudy.dto.StudyStatus;

@Mapper
public interface StudyStatusMapper {

    int mergeStudyStatus(StudyStatus studyStatus);

    List<StudyStatus> selectMyStudyStatusList(int memberNo);
}