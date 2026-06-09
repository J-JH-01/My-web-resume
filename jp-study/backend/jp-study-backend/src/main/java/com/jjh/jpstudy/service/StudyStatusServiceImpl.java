package com.jjh.jpstudy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jjh.jpstudy.dto.StudyStatus;
import com.jjh.jpstudy.mapper.StudyStatusMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudyStatusServiceImpl implements StudyStatusService {

    private final StudyStatusMapper studyStatusMapper;

    @Override
    public int saveStudyStatus(StudyStatus studyStatus) {
        return studyStatusMapper.mergeStudyStatus(studyStatus);
    }

    @Override
    public List<StudyStatus> selectMyStudyStatusList(int memberNo) {
        return studyStatusMapper.selectMyStudyStatusList(memberNo);
    }
}