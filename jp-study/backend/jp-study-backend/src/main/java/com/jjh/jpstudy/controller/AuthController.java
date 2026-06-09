package com.jjh.jpstudy.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jjh.jpstudy.dto.Member;
import com.jjh.jpstudy.service.MemberService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final MemberService memberService;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Member inputMember,
            HttpSession session) {

        Member loginMember = memberService.login(inputMember);

        if (loginMember == null) {
            return ResponseEntity.badRequest().body("아이디 또는 비밀번호가 일치하지 않습니다.");
        }

        session.setAttribute("loginMember", loginMember);

        return ResponseEntity.ok(loginMember);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getLoginMember(HttpSession session) {

        Member loginMember = (Member) session.getAttribute("loginMember");

        if (loginMember == null) {
            return ResponseEntity.status(401).body("로그인되어 있지 않습니다.");
        }

        return ResponseEntity.ok(loginMember);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {

        session.invalidate();

        return ResponseEntity.ok("로그아웃 성공");
    }
}