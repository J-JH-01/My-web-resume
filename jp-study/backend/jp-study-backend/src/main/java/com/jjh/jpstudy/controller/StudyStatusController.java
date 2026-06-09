package com.jjh.jpstudy.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jjh.jpstudy.dto.Member;
import com.jjh.jpstudy.dto.StudyStatus;
import com.jjh.jpstudy.service.StudyStatusService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/study-status")
@RequiredArgsConstructor
public class StudyStatusController {

    private final StudyStatusService studyStatusService;

    @PostMapping
    public ResponseEntity<String> saveStudyStatus(
            @RequestBody StudyStatus inputStatus,
            HttpSession session) {

        Member loginMember = (Member) session.getAttribute("loginMember");

        if (loginMember == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        inputStatus.setMemberNo(loginMember.getMemberNo());

        int result = studyStatusService.saveStudyStatus(inputStatus);

        if (result > 0) {
            return ResponseEntity.ok("학습 상태 저장 성공");
        }

        return ResponseEntity.internalServerError().body("학습 상태 저장 실패");
    }

    @GetMapping
    public ResponseEntity<?> selectMyStudyStatusList(HttpSession session) {

        Member loginMember = (Member) session.getAttribute("loginMember");

        if (loginMember == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        List<StudyStatus> statusList =
                studyStatusService.selectMyStudyStatusList(loginMember.getMemberNo());

        return ResponseEntity.ok(statusList);
    }
}