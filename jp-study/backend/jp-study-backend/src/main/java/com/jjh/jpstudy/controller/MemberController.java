package com.jjh.jpstudy.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jjh.jpstudy.dto.Member;
import com.jjh.jpstudy.service.MemberService;

import lombok.RequiredArgsConstructor;

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
}