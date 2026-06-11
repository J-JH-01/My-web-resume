package com.jjh.jpstudy.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jjh.jpstudy.dto.Member;
import com.jjh.jpstudy.service.MemberService;

import lombok.RequiredArgsConstructor;
import jakarta.servlet.http.HttpSession;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Member inputMember) {

        int result = memberService.signup(inputMember);

        if (result == -1) {
            return ResponseEntity.badRequest().body("이미 사용 중인 아이디입니다.");
        }

        if (result > 0) {
            return ResponseEntity.ok("회원가입 성공");
        }

        return ResponseEntity.internalServerError().body("회원가입 실패");
    }
    
    @PutMapping("/me")
    public ResponseEntity<?> updateMemberInfo(
            @RequestBody Member inputMember,
            HttpSession session) {

        Member loginMember = (Member) session.getAttribute("loginMember");

        if (loginMember == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        inputMember.setMemberNo(loginMember.getMemberNo());

        Member updatedMember = memberService.updateMemberInfo(inputMember);

        if (updatedMember == null) {
            return ResponseEntity.badRequest().body("회원정보 수정 실패");
        }

        session.setAttribute("loginMember", updatedMember);

        return ResponseEntity.ok(updatedMember);
    }
    
    @PostMapping("/me/profile-image")
    public ResponseEntity<?> updateProfileImage(
            @RequestParam("profileImage") MultipartFile profileImage,
            HttpSession session) throws IOException {

        Member loginMember = (Member) session.getAttribute("loginMember");

        if (loginMember == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        if (profileImage.isEmpty()) {
            return ResponseEntity.badRequest().body("이미지 파일을 선택해주세요.");
        }

        String originalName = profileImage.getOriginalFilename();

        if (originalName == null || originalName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("파일명이 올바르지 않습니다.");
        }

        String ext = originalName.substring(originalName.lastIndexOf(".")).toLowerCase();

        if (!ext.equals(".jpg")
                && !ext.equals(".jpeg")
                && !ext.equals(".png")
                && !ext.equals(".gif")
                && !ext.equals(".webp")) {
            return ResponseEntity.badRequest().body("이미지 파일만 업로드할 수 있습니다.");
        }

        String uploadDir = "C:/workspace/Portfolio/files/profile/";
        File dir = new File(uploadDir);

        if (!dir.exists()) {
            dir.mkdirs();
        }

        String rename = UUID.randomUUID().toString() + ext;
        File dest = new File(uploadDir + rename);

        profileImage.transferTo(dest);

        String profileImgPath = "/uploads/profile/" + rename;

        Member member = new Member();
        member.setMemberNo(loginMember.getMemberNo());
        member.setProfileImg(profileImgPath);

        Member updatedMember = memberService.updateProfileImage(member);

        if (updatedMember == null) {
            return ResponseEntity.internalServerError().body("프로필 이미지 저장 실패");
        }

        session.setAttribute("loginMember", updatedMember);

        return ResponseEntity.ok(updatedMember);
    }
    
    
    
}