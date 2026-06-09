package com.jjh.jpstudy.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.jjh.jpstudy.dto.Member;
import com.jjh.jpstudy.mapper.MemberMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberMapper memberMapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public int signup(Member inputMember) {

        int count = memberMapper.checkMemberId(inputMember.getMemberId());

        if (count > 0) {
            return -1;
        }

        String encPw = bCryptPasswordEncoder.encode(inputMember.getMemberPw());
        inputMember.setMemberPw(encPw);

        return memberMapper.insertMember(inputMember);
    }

    @Override
    public Member login(Member inputMember) {

        Member savedMember = memberMapper.selectMemberById(inputMember.getMemberId());

        if (savedMember == null) {
            return null;
        }

        boolean isMatched = bCryptPasswordEncoder.matches(
                inputMember.getMemberPw(),
                savedMember.getMemberPw()
        );

        if (!isMatched) {
            return null;
        }

        savedMember.setMemberPw(null);

        return savedMember;
    }
}